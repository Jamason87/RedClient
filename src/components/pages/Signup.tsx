import { Grid, Paper, TextField, Button, Box } from "@material-ui/core";
import Axios from "axios";
import React, { Component } from "react";
import { RootContext } from "../contexts/RootContext";

type SignupProps = {
    component: React.Component
}

type SignupState = {
    iUsername: string,
    iEmail: string,
    iEmail2: string,
    iPassword: string,
    iPassword2: string,
    registered: boolean,
    errors: Array<string>
}

export default class Signup extends Component<SignupProps, SignupState> {

    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            iUsername: '',
            iPassword: '',
            iPassword2: '',
            iEmail: '',
            iEmail2: '',
            errors: [],
            registered: false
        }

        this.submit = this.submit.bind(this);
    }

    submit(e: any) {
        e.preventDefault();

        let errors = []

        if (this.state.iPassword !== this.state.iPassword2) errors.push('Your passwords do not match')
        if (this.state.iEmail !== this.state.iEmail2) errors.push('Your email addresses do not match')
        if (this.state.iPassword === '') errors.push('Your password cannot be blank')
        if (this.state.iUsername === '') errors.push('Your username cannot be blank')
        if (this.state.iEmail === '') errors.push('Your email cannot be blank')
        if (this.state.iPassword.length < 6) errors.push('Your password must be at least 6 characters long')
        if (this.state.iUsername.length < 4) errors.push('Your username must be at least 4 characters long')

        if (errors.length !== 0) {
            this.setState({
                errors: errors
            })

            return;
        }

        if (errors.length === 0) {
            Axios.post(`${this.context.serverUrl}/user/register`, {
                email: this.state.iEmail,
                username: this.state.iUsername,
                password: this.state.iPassword
            })
                .then(res => {
                    this.setState({
                        registered: true
                    })
                })
                .catch(err => {
                    //issue
                })
        }

        if (errors.length !== 0) this.setState({errors: errors})
    }

    loggedInView() {
        console.log(this.context.serverUrl)

        return (
            <Grid container spacing={0} alignItems="center" justify="center" direction="column">
                <Grid item xs={6}>
                    <Paper>
                        <Box display="flex" alignItems="center" justifyContent="center" style={{ padding: "10px", width: "300px" }}>
                            You are already logged in!  You don't need to create an account!
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    registeredView() {
        return (
            <Grid container spacing={0} alignItems="center" justify="center" direction="column">
                <Grid item xs={6}>
                    <Paper>
                        <Box display="flex" alignItems="center" justifyContent="center" style={{ padding: "10px", width: "300px" }}>
                            Your account has been succesfully created!
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    defaultView() {
        return (
            <Grid container spacing={0} alignItems="center" justify="center" direction="column">
                <Grid item xs={6}>
                    <Paper elevation={3}>
                        <Box display="flex" alignItems="center" justifyContent="center" style={{ padding: "10px", width: "300px" }}>
                            <form noValidate autoComplete="off">
                                <Grid container direction="column">
                                    <Grid item>
                                        <h1 style={{ textAlign: "center" }}>Signup</h1>
                                    </Grid>
                                    {
                                        this.state.errors.map(e => {
                                            return <Grid item><p style={{color: "red"}}>{e}</p></Grid>
                                        })
                                    }
                                    <Grid item>
                                        <TextField id="standard-basic" label="Email" onChange={
                                            (e) => {
                                                e.preventDefault();
                                                this.setState({
                                                    iEmail: e.target.value
                                                })
                                            }
                                        } />
                                        <br /><br />
                                        <TextField id="standard-basic" label="Verify Email" onChange={
                                            (e) => {
                                                e.preventDefault();
                                                this.setState({
                                                    iEmail2: e.target.value
                                                })
                                            }
                                        } />
                                        <br /><br />
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
                                        <br /><br />
                                        <TextField id="standard-basic" type="password" label="Verify Password" onChange={
                                            (e) => {
                                                e.preventDefault();
                                                this.setState({
                                                    iPassword2: e.target.value
                                                })
                                            }
                                        } />
                                    </Grid>
                                    <Grid item style={{ textAlign: "center", padding: "30px" }}>
                                        <Button variant="contained" color="primary" onClick={this.submit}>Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    render() {
        return (
            this.context.authenticated === 'true' ? this.loggedInView() : (this.state.registered ? this.registeredView() : this.defaultView())
        )
    }
}
