import React from 'react'

export default function CollectionListItem(props: any) {


    return (
        <React.Fragment>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
        </React.Fragment>
    )
}
