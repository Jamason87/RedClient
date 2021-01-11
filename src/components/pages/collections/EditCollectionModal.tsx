import { Button, Grid, Paper, TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { Component } from 'react'
import { RootContext } from '../../contexts/RootContext';

type EditCollectionModalProps = {
    collection: any,
    closeModal: Function
}
type EditCollectionModalState = {
    styles: any
    result: any,
    iName: string,
    iDescription: string
}

export default class EditCollectionModal extends Component<EditCollectionModalProps, EditCollectionModalState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            styles: {
                root: {
                    width: '600px',
                    padding: '20px'
                },
                rightButton: {
                    justifyContent: "flex-end"
                },
                textField: {
                    width: '100%'
                }
            },
            result: this.props.collection,
            iName: this.props.collection.name,
            iDescription: this.props.collection.description
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleDelete() {
        Axios.get(`${this.context.serverUrl}/collection/delete/${this.state.result.id}`, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                this.props.closeModal(false, true);
            })
    }

    handleUpdate() {
        let axiosData = {
            collectionId: this.state.result.id,
            name: this.state.iName,
            description: this.state.iDescription,
            funkos: this.state.result.funkos
        }

        Axios.post(`${this.context.serverUrl}/collection/update`, axiosData, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                this.props.closeModal(true, false);
            })
    }

    handleNameChange(e: React.ChangeEvent<{value: string}>) {
        this.setState({
            iName: e.target.value
        })
    } 

    handleDescriptionChange(e: React.ChangeEvent<{value: string}>) {
        this.setState({
            iDescription: e.target.value
        })
    }

    render() {
        return (
            <Grid container alignItems="center" justify="center" component={Paper} style={this.state.styles.root}>
                <Grid item xs={8} >
                    <TextField label="Name" style={this.state.styles.textField} value={this.state.iName} onChange={this.handleNameChange}></TextField>
                </Grid>
                <Grid item xs={8} >
                    <TextField label="Description" style={this.state.styles.textField} value={this.state.iDescription} onChange={this.handleDescriptionChange}></TextField><br />
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" color="secondary" onClick={this.handleDelete}>Delete</Button>
                </Grid>
                <Grid item justify="flex-end" style={this.state.styles.rightButton} xs={6}>
                    <Button variant="contained" color="primary" onClick={this.handleUpdate}>Submit</Button>
                </Grid>
            </Grid>
        )
    }
}