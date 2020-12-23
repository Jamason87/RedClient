import { Grid, Paper, TextField, Button, Box } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import { useState } from "react";
import { RootContext } from "../contexts/RootContext";

function Signup() {
    const [iUsername, setIUsername] = useState('');
    const [iEmail, setIEmail] = useState('');
    const [iPassword, setIPassword] = useState('');

    const [registered, setRegistered] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const rContext = React.useContext(RootContext);

    //Connects to server to register a new user
    function submit(e: any) {
        e.preventDefault();

        Axios.post('http://localhost:4002/user/register', {
            email: iEmail,
            username: iUsername,
            password: iPassword
        })
            .then(res => {
                //success
                setRegistered(true);

            })
            .catch(err => {
                //issue
            })
    }

    function loggedInView() {
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

    function registeredView() {
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

    function defaultView() {
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
                                                    setIEmail(e.target.value);
                                                }
                                            }  />
                                        <br /><br />
                                        <TextField id="standard-basic" label="Username" onChange={
                                                (e) => {
                                                    e.preventDefault();
                                                    setIUsername(e.target.value);
                                                }
                                            }  />
                                        <br /><br />
                                        <TextField id="standard-basic" label="Password" onChange={
                                                (e) => {
                                                    e.preventDefault();
                                                    setIPassword(e.target.value);
                                                }
                                            }  />
                                    </Grid>
                                    <Grid item style={{textAlign: "center", padding: "30px"}}>
                                        <Button variant="contained" color="primary" onClick={submit}>Submit</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        )
    }

    return (
        <React.Fragment>
            {rContext.authenticated ==='true' ? loggedInView() : registered ? registeredView() : defaultView()}
        </React.Fragment>
    );
}

export default Signup;