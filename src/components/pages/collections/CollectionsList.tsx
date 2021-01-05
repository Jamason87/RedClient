import Axios from "axios";
import React, { Component } from "react";
import { RootContext } from '../../contexts/RootContext';
import CollectionListItem from "./CollectionListItem";

type CollectionsListProps = {

}

type CollectionsListState = {
    page: number,
    maxResults: number,
    totalResults: number,
    results: Array<any>
}

export default class CollectionsList extends Component<CollectionsListProps, CollectionsListState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            page: 1,
            maxResults: 10,
            totalResults: 0,
            results: []
        }
    }

    loadData() {
        let axiosData = {
            page: this.state.page,
            maxResults: this.state.maxResults
        }

        Axios.post(`${this.context.serverUrl}/collection/user`, axiosData, {
            headers: {
                'Authorization': this.context.token
            }
        })
            .then(res => {
                this.setState({
                    totalResults: res.data.data.count,
                    results: res.data.data.rows
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.results.map((result: any) => {
                        return <CollectionListItem id={result.id} name={result.name} description={result.description} />
                    })
                }
            </React.Fragment>
        )
    }
}
