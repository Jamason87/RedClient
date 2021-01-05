import { TableRow, TableCell } from "@material-ui/core";
import Axios from "axios";
import React, { Component } from "react";
import { RootContext } from "../../contexts/RootContext";

type CollectionTableItemProps = {
    funkoId: number
}

type CollectionTableItemState = {
    name: string,
    imageUrl: string
}

export default class CollectionTableItem extends Component<CollectionTableItemProps, CollectionTableItemState> {
    static contextType = RootContext

    constructor(props: never) {
        super(props);

        this.state = {
            name: '',
            imageUrl: ''
        }
    }

    componentDidMount() {
        Axios.get(`${this.context.serverUrl}/funko/${this.props.funkoId}`)
            .then(res => {
                this.setState({
                    name: res.data.data.title,
                    imageUrl: res.data.data.imageName
                });
            })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.name && (
                    <TableRow>
                        <TableCell>{name} - <img src={this.state.imageUrl} /></TableCell>
                    </TableRow>)
                }
            </React.Fragment>
        )
    }
}
