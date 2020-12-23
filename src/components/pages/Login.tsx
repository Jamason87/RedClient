import { Grid, Paper, TextField, Button, Box } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

import { RootContext } from '../contexts/RootContext';

function Login() {
    const [iUsername, setIUsername] = useState('');
    const [iPassword, setIPassword] = useState('');

    const rContext = React.useContext(RootContext);

    //Connects to server to login a new user
    function submit(e: any) {
        e.preventDefault();

        //Handle login token here
        Axios.post('http://localhost:4002/user/login', {
            username: iUsername,
            password: iPassword
        })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    rContext.setAuthenticated('true');
                }
            })
            .catch(err => {
                console.log('ERROR', err)
            })
    }

    function logout() {
        localStorage.removeItem('token');
        rContext.setAuthenticated('false');
    }

    function loggedInView() {
        return (
            <Grid container spacing={0} alignItems="center" justify="center" direction="column">
                <Grid item xs={6}>
                    <Paper>
                        <Box display="flex" alignItems="center" justifyContent="center" style={{ padding: "10px", width: "300px" }}>
                            You are already logged in!
                            <Button onClick={logout}>Logout</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    return (
        rContext.authenticated === 'true' ? loggedInView() :
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
                                                setIUsername(e.target.value);
                                            }
                                        } />
                                        <br /><br />
                                        <TextField id="standard-basic" label="Password" onChange={
                                            (e) => {
                                                e.preventDefault();
                                                setIPassword(e.target.value);
                                            }
                                        } />
                                    </Grid>
                                    <Grid item style={{ textAlign: "center", padding: "30px" }}>
                                        <Button onClick={submit} variant="contained" color="primary">Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
    )
}

export default Login;