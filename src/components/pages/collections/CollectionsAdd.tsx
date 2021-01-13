import { Button, Grid, makeStyles, Paper, TextField, withStyles } from '@material-ui/core';
import Axios from 'axios';
import React, { Component } from 'react'
import { RootContext } from '../../contexts/RootContext';

type CollectionsAddProps = {
    closeModal: Function
}
type CollectionsAddState = {
    styles: any,
    iName: string,
    iDesc: string,
    errors: Array<string>
}

export default class CollectionsAdd extends Component<CollectionsAddProps, CollectionsAddState> {
    static contextType = RootContext
    constructor(props: any) {
        super(props);

        this.state = {
            iName: '',
            iDesc: '',
            styles: {
                textfield: {
                    width: '300px'
                },
                errorMsg: {
                    color: 'red'
                }
            },
            errors: []
        }

        this.onSubmit = this.onSubmit.bind(this)
    }

    onInputChange(e: any, v: string) {
        switch (v) {
            case "name":
                this.setState({
                    iName: e.target.value
                })
                break;
            case "desc":
                this.setState({
                    iDesc: e.target.value
                })
                break;
        }
    }

    onSubmit(e: any) {
        e.preventDefault();

        let success = false;
        let errors = [];
        //Handle adding a new collection
        if (this.state.iName === '') errors.push('The name must not be empty.')
        if (this.state.iDesc === '') errors.push('The description must not be empty.')

        if (errors.length === 0) {
            let axiosData = {
                name: this.state.iName,
                description: this.state.iDesc
            }

            Axios.post(`${this.context.serverUrl}/collection/create`, axiosData, {
                headers: {
                    "Authorization": this.context.token
                }
            })
                .then(res => {
                    this.props.closeModal()
                })

        } else {
            this.setState({
                errors: errors
            })
        }
    }

    render() {
        return (
            <Paper style={{
                padding: 10
            }}>
                {this.state.errors.length !== 0 && <div>
                    {this.state.errors.map(e => {
                        return <p style={this.state.styles.errorMsg}>{e}</p>
                    })}
                </div>}
                <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                    <TextField type="text" style={this.state.styles.textfield} onChange={(e) => this.onInputChange(e, "name")} label="Name" />< br />
                    <TextField type="text" style={this.state.styles.textfield} onChange={(e) => this.onInputChange(e, "desc")} label="Description" /><br /><br />
                    <Button color="primary" variant="contained" type="submit">Add</Button>
                </form>
            </Paper>
        )
    }
}