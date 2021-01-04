import { Grid, Paper, TextField, Button, Box } from "@material-ui/core";
import Axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { RootContext } from '../contexts/RootContext';


type LoginState = {
    iUsername: string,
    iPassword: string
}

type LoginProps = {
    component: any
}

export default class Login extends Component<LoginProps, LoginState> {

    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            iUsername: '',
            iPassword: ''
        }

        this.submit = this.submit.bind(this);
    }

    submit(e: any) {
        e.preventDefault();

        //Handle login token here
        Axios.post('http://localhost:4002/user/login', {
            username: this.state.iUsername,
            password: this.state.iPassword
        })
            .then(res => {
                if (res.data.token) {
                    //localStorage.setItem('token', res.data.token);
                    this.context.setAuthenticated('true');
                    this.context.setToken(res.data.token);
                }
            })
            .catch(err => {
                console.log('ERROR', err)
            })
    }

    logout() {
        this.context.setToken('')
        this.context.setAuthenticated('false');
    }

    loggedInView() {
        return (
            <Redirect to="/" />
        )
    }

    componentDidMount() {
        console.log(this.context.authenticated)
    }

    render() {
        return (
            this.context.authenticated === 'true' ? this.loggedInView() :
            <Grid container spacing={0} alignItems="center" justify="center" direction="column">
                <Grid item xs={6}>
                    <Paper>
                        <Box display="flex" alignItems="center" justifyContent="center" style={{ padding: "10px", width: "300px" }}>
                            <form noValidate autoComplete="off">
                                <Grid container direction="column">
                                    <Grid item>
                                        <h1 style={{ textAlign: "center" }}>Login</h1>
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-basic" label="Username" onChange={
                                            (e) => {
                                                e.preventDefault();
                                                
                                                this.setState({
                                                    iUsername: e.target.value
                                                })
                                            }
                                        } />
                                        <br /><br />
                                        <TextField id="standard-basic" label="Password" onChange={
                                            (e) => {
                                                e.preventDefault();

                                                this.setState({
                                                    iPassword: e.target.value
                                                })
                                            }
                                        } />
                                    </Grid>
                                    <Grid item style={{ textAlign: "center", padding: "30px" }}>
                                        <Button onClick={this.submit} variant="contained" color="primary">Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}
