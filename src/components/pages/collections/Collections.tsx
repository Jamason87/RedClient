import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Axios from 'axios';
import React, { Component } from 'react'
import { RootContext } from '../../contexts/RootContext';
import CollectionsList from './CollectionsList'

type CollectionsProps = {

}

type CollectionsState = {
    totalResults: number
    page: number,
    maxResults: number
}

export default class Collections extends Component<CollectionsProps, CollectionsState> {

    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            totalResults: 0,
            page: 1,
            maxResults: 10,
        }
    }

    componentDidMount() {
        let axiosData = {
            page: 1,
            maxResults: 1
        }

        Axios.post(`${this.context.serverUrl}/collection/user`, axiosData, {
            headers: {
                'Authorization': this.context.token
            }
        })
            .then(res => {
                this.setState({
                    totalResults: res.data.data.count
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    render() {
        return (
            <React.Fragment>
                <h2>Collections List</h2>
                <CollectionsList page={this.state.page} maxResults={this.state.maxResults} />
                <br />
                <Grid container justify="space-around">
                    <Pagination count={
                            Math.ceil(this.state.totalResults/this.state.maxResults)
                        } defaultPage={1} siblingCount={1} boundaryCount={1} page={this.state.page} onChange={(e,v) => {
                            this.setState({
                                page: v
                            })
                        }} />
                </Grid>
            </React.Fragment>
        )
    }
}

/**
 * Buttons for pages back and forth, max results of pages returned
 */