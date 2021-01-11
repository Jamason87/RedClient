import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import { Collections } from '@material-ui/icons';
import Axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { RootContext } from '../../contexts/RootContext';

type FunkoAddToCollectionProps = {
    closeModal: Function,
    funkoId: number
}
type FunkoAddToCollectionState = {
    styles: any,
    collections: Array<any>,
    selectedCollection: number | unknown
}

export default class FunkoAddToCollection extends Component<FunkoAddToCollectionProps, FunkoAddToCollectionState> {
    static contextType = RootContext;

    constructor(props: FunkoAddToCollectionProps) {
        super(props);

        this.state = {
            styles: {
                root: {
                    width: '600px'
                }
            },
            collections: [],
            selectedCollection: -1
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        //find collections that exist for this user, add them to a list and provide a drop down to choose a collection to add the funko to.
        let axiosData = {
            ignoreLimits: true
        }
        Axios.post(`${this.context.serverUrl}/collection/user`, axiosData, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                res.data.data.rows.map((r: any) => {
                    this.setState({
                        collections: [...this.state.collections, {
                            id: r.id,
                            name: r.name,
                            description: r.description,
                            funkos: r.funkos
                        }]
                    })

                    this.setState({
                        selectedCollection: this.state.collections[0].id
                    })
                })
            })//TODO: FINISH THE ADD TO A COLLECTION FUNKO
    }

    handleChange(e: React.ChangeEvent<{value: number | unknown}>) {
        e.preventDefault();

        this.setState({
            selectedCollection: e.target.value
        })
    }

    handleSubmit(e: React.MouseEvent) {
        e.preventDefault();

        let axiosData = {
            collectionId: this.state.selectedCollection,
            name: this.state.collections.find(e => e.id === this.state.selectedCollection).name,
            description: this.state.collections.find(e => e.id === this.state.selectedCollection).description,
            funkos: [...this.state.collections.find(e => e.id === this.state.selectedCollection).funkos, this.props.funkoId]
        }

        Axios.post(`${this.context.serverUrl}/collection/update`, axiosData, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                this.props.closeModal(true);
            })
    }

    render() {
        return (
            <Grid component={Paper} style={this.state.styles.root} justify="center" container>
                { this.state.collections.length !== 0 && <Grid item xs={12}>
                    <form>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">Collections</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.collections[0].id}
                                onChange={this.handleChange}
                            >
                                {this.state.collections.map((c) => {
                                    return <MenuItem value={c.id}>{c.name}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <br />
                        <Button onClick={this.handleSubmit}>Add</Button>
                    </form>
                </Grid>}

                {this.state.collections.length === 0 && <Typography variant="subtitle1">You do not have a collection, please head over to the <Link to="/collections">collections</Link> page to get started.</Typography>}
            </Grid>
        )
    }
}