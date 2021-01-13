import { Button, Card, CardContent, CardHeader, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { DeleteForever, ExpandMore, SupervisorAccount, Visibility } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import Axios from 'axios';
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { StringLiteral } from 'typescript';
import { RootContext } from '../contexts/RootContext';

type AdminProps = {}
type AdminState = {
    iUsername: string,
    userExpanded: boolean,
    userPage: number,
    users: Array<any>,
    maxUserPage: number,
    userData: any
}

export default class Admin extends Component<AdminProps, AdminState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            iUsername: '',
            userExpanded: false,
            userPage: 1,
            users: [],
            maxUserPage: 0,
            userData: null
        }

        this.handleExpand = this.handleExpand.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.showUser = this.showUser.bind(this);
        this.adminUpdate = this.adminUpdate.bind(this);
    }

    componentDidMount() {
        this.loadUserPage()
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.userPage !== this.state.userPage) {
            this.loadUserPage();
        }
    }

    loadUserPage() {
        let axiosData = {
            page: this.state.userPage
        }

        Axios.post(`${this.context.serverUrl}/user/all`, axiosData, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                this.setState({
                    users: res.data.rows,
                    maxUserPage: Math.ceil(res.data.count / 10)
                })

                console.log(res.data)
            })
    }

    deleteUser(id: number) {
        Axios.get(`${this.context.serverUrl}/user/delete/${id}`, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                this.loadUserPage();
            })
    }

    showUser(id: number) {
        Axios.get(`${this.context.serverUrl}/user/id/${id}`, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                this.setState({
                    userData: res.data
                })
            })
    }

    deleteCollection(id: number) {
        Axios.get(`${this.context.serverUrl}/collection/delete/${id}`, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                this.showUser(this.state.userData.user.id);
            })
    }

    adminUpdate() {
        let user = this.state.userData.user;

        user.isAdmin = !user.isAdmin

        Axios.post(`${this.context.serverUrl}/user/update`, user, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                this.showUser(user.id);
                this.loadUserPage()
            })
    }

    handleExpand() {
        this.setState({
            userExpanded: !this.state.userExpanded
        })
    }

    render() {
        if (!this.context.isAdmin) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <Grid container justify="space-around">
                    <Grid item xs={8} component={Paper} style={{ padding: '30px' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardHeader title="Users" action={
                                        <IconButton>
                                            <ExpandMore style={
                                                this.state.userExpanded ? { transform: 'rotate(180deg)' } : {}
                                            } onClick={this.handleExpand} />
                                        </IconButton>
                                    } />
                                    <Collapse in={this.state.userExpanded}>
                                        <CardContent>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Name</TableCell>
                                                        <TableCell align="right">Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.users.map((u) => {
                                                        return (
                                                            <TableRow>
                                                                <TableCell>{u.username} {u.isAdmin ? '(ADMIN)': ''}</TableCell>
                                                                <TableCell align="right">
                                                                    <IconButton onClick={() => this.showUser(u.id)}>
                                                                        <Visibility />
                                                                    </IconButton>
                                                                    <IconButton onClick={() => this.deleteUser(u.id)}>
                                                                        <DeleteForever />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>

                                            <Grid container justify="space-around">
                                                <Pagination count={
                                                    Math.ceil(this.state.maxUserPage)
                                                } defaultPage={1} siblingCount={1} boundaryCount={1} page={this.state.userPage} onChange={(e, v) => {
                                                    this.setState({
                                                        userPage: v
                                                    })
                                                }} />
                                            </Grid>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                {this.state.userData !== null &&
                                    <Card>
                                        <CardHeader title={this.state.userData.user.username}
                                            subheader={this.state.userData.user.email}
                                            action={
                                                <IconButton onClick={this.adminUpdate}>
                                                    <SupervisorAccount color={this.state.userData.user.isAdmin ? 'secondary':'primary'}/>
                                                </IconButton>
                                            } />
                                        <CardContent>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Collection Name</TableCell>
                                                        <TableCell align="right">Actions</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.userData.collections.map((c: any) => {
                                                        return (<TableRow>
                                                            <TableCell>
                                                                <Link to={`/collection/${c.id}`}>{c.name}</Link>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <IconButton onClick={() => {
                                                                    this.deleteCollection(c.id);
                                                                }}>
                                                                    <DeleteForever />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>);
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}