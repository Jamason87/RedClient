import React, { Component } from 'react'

type CollectionListItemProps = {
    name: string,
    description: string
    id: number
}

type CollectionListItemState = {

}

export default class CollectionListItem extends Component<CollectionListItemProps, CollectionListItemState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <h1>{this.props.name}</h1>
                <p>{this.props.description}</p>
            </React.Fragment>
        )
    }
}
