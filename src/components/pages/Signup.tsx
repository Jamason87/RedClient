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
    iPassword: string,
    registered: boolean
}

export default class Signup extends Component<SignupProps, SignupState> {

    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            iUsername: '',
            iPassword: '',
            iEmail: '',
            registered: false
        }

        this.submit = this.submit.bind(this);
    }    

    submit(e: any) {
        e.preventDefault();

        Axios.post('http://localhost:4002/user/register', {
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
                    <Paper>
                        <Box display="flex" alignItems="center" justifyContent="center" style={{ padding: "10px", width: "300px" }}>
                            <form noValidate autoComplete="off">
                                <Grid container direction="column">
                                    <Grid item>
                                        <h1 style={{textAlign: "center"}}>Signup</h1>
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-basic" label="Email" onChange={
                                                (e) => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        iEmail: e.target.value
                                                    })
                                                }
                                            }  />
                                        <br /><br />
                                        <TextField id="standard-basic" label="Username" onChange={
                                                (e) => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        iUsername: e.target.value
                                                    })
                                                }
                                            }  />
                                        <br /><br />
                                        <TextField id="standard-basic" label="Password" onChange={
                                                (e) => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        iPassword: e.target.value
                                                    })
                                                }
                                            }  />
                                    </Grid>
                                    <Grid item style={{textAlign: "center", padding: "30px"}}>
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
