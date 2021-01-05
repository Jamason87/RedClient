import Axios from 'axios'
import { Component } from 'react'
import { useParams } from 'react-router-dom'
import { RootContext } from '../../contexts/RootContext';

type CollectionProps = {

}

type CollectionState = {
    result: any
    collectionId: any
}

export default class Collection extends Component<CollectionProps, CollectionState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props)

        this.state = {
            collectionId: useParams<{collectionId: string}>(),
            result: null
        }
    }

    componentDidMount() {
        Axios.get(`${this.context.serverUrl}/collection/id/${this.state.collectionId}`)
            .then(res => {
                console.log(res.data.data)
            })
    }

    render() {
        return (
            <div>
                This is a collection page.
            </div>
        )
    }
}
