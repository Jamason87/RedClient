import Axios from 'axios';
import React, { Component } from 'react'
import {RootContext} from '../../contexts/RootContext'
import {Pagination} from '@material-ui/lab'
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';

type resultObj = {
    title: string
    id: number
}

type SearchListProps = {
    query: string
}
type SearchListState = {
    results: Array<resultObj>,
    rCount: number,
    maxResults: number,
    page: number
}

export default class SearchList extends Component<SearchListProps, SearchListState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            results: [],
            rCount: 0,
            maxResults: 10,
            page: 1
        }
    }

    executeQuery() {
        let axiosData = {
            query: this.props.query,
            page: this.state.page,
            maxResults: this.state.maxResults
        }

        Axios.post(`${this.context.serverUrl}/funko/search`, axiosData)//TODO LATER
            .then(res => {
                console.log(res.data.data.rows.map((o: any) => o.title))

                this.setState({
                    results: res.data.data.rows,
                    rCount: res.data.data.count
                })
            })
    }

    componentDidMount() {
        this.executeQuery();
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.query !== this.props.query || prevState.page !== this.state.page) {
            this.executeQuery();
            console.log('update fired')
        }
    }

    render() {
        return (
            <div>
                {this.state.results.map((result) => {
                    return <li><Link to={`/funko/${result.id}`}>{result.title}</Link></li>
                })}

                <Grid container justify="space-around">
                    <Pagination count={
                            Math.ceil(this.state.rCount/this.state.maxResults)
                        } defaultPage={1} siblingCount={1} boundaryCount={1} page={this.state.page} onChange={(e,v) => {
                            this.setState({
                                page: v
                            })
                        }} />
                </Grid>
            </div>
        )
    }
}