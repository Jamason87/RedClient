import { Grid, Paper, TextField, Button, Box } from "@material-ui/core";
import Axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { RootContext } from '../contexts/RootContext';


type LoginState = {
    iUsername: string,
    iPassword: string,
    errors: Array<string>
}

type LoginProps = {
    component: any
    history?: any
}

export default class Login extends Component<LoginProps, LoginState> {

    static contextType = RootContext;

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            iUsername: '',
            iPassword: '',
            errors: []
        }

        this.submit = this.submit.bind(this);
    }

    submit(e: any) {
        e.preventDefault();

        let errors = []
        if (this.state.iUsername === '') errors.push('The username must not be blank.');
        if (this.state.iPassword === '') errors.push('The password must not be blank.');

        if (errors.length !== 0) {

            this.setState({
                errors: errors
            });
            return;
        }

        //Handle login token here
        Axios.post('http://localhost:4002/user/login', {
            username: this.state.iUsername,
            password: this.state.iPassword
        })
            .then(res => {
                if (res.data.token && res.status === 200) {
                    //localStorage.setItem('token', res.data.token);
                    this.context.setAuthenticated('true');
                    this.context.setToken(res.data.token);
                } else {
                    errors.push('Your username/password does not match our records.')
                }
            })
            .catch(err => {
                this.setState({
                    errors: ['Your username/password does not match our records.']
                });
            })

        this.setState({
            errors: errors
        });
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
                        <Paper elevation={3}>
                            <Box display="flex" alignItems="center" justifyContent="center" style={{ padding: "10px", width: "300px" }}>
                                <form noValidate autoComplete="off">
                                    <Grid container direction="column">
                                        <Grid item>
                                            <h1 style={{ textAlign: "center" }}>Login</h1>
                                        </Grid>
                                        {this.state.errors.map(e => {
                                            return <Grid item><p style={{color: "red"}}>{e}</p></Grid>;
                                        })}
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
                                            <TextField id="standard-basic" type="password" label="Password" onChange={
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
                                        <Grid item style={{ textAlign: "center", padding: "30px", paddingTop: "0px" }}>
                                            <Button onClick={() => this.props.history.push('/signup')} variant="contained" color="primary">New User?</Button>
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
