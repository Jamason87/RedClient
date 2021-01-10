import { Grid, Paper } from '@material-ui/core';
import { Collections } from '@material-ui/icons';
import Axios from 'axios';
import React, { Component } from 'react'

type FunkoAddToCollectionProps = {
    closeModal: Function
}
type FunkoAddToCollectionState = {
    styles: any
    collections: Array<any>
}

export default class FunkoAddToCollection extends Component<FunkoAddToCollectionProps, FunkoAddToCollectionState> {
    constructor(props: FunkoAddToCollectionProps) {
        super(props);

        this.state = {
            styles: {
                root: {
                    width: '600px'
                }
            },
            collections: []
        }
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
                            name: r.name
                        }]
                    })
                })
            })//TODO: FINISH THE ADD TO A COLLECTION FUNKO
    }

    render() {
        return (
            <Grid component={Paper} style={this.state.styles.root} justify="center" container>
                <Grid item xs={5}>
                    This is a test
                </Grid>
            </Grid>
        )
    }
}