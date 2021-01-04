import Axios from "axios";
import React, { Component } from "react";
import { RootContext } from "../../contexts/RootContext";
import CollectionTable from "./CollectionTable";

type WishlistProps = {
    component: any
}

type WishlistState = {
    funkos: []
}

export default class Wishlist extends Component<WishlistProps, WishlistState> {

    static contextType = RootContext;

    constructor(props: any) {
        super(props)

        this.state = {
            funkos: []
        }
    }

    componentDidMount() {
        console.log(this.context.authenticated)
        Axios.get(`${this.context.serverUrl}/collection/wishlist`, {
            headers: {
                'Authorization': this.context.token
            }
        })
            .then((res) => {
                this.setState({
                    funkos: res.data.wishlist.funkos
                })
            });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Wishlist</h1>
                <CollectionTable funkos={this.state.funkos} / >
            </React.Fragment>
        )
    }
}
