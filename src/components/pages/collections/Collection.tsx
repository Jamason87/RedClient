import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RootContext } from '../../contexts/RootContext';

export default function Collection() {
    const { collectionId } = useParams<{collectionId: string}>()
    const rContext = useContext(RootContext);
    const [result, setResult] = useState();

    useEffect(() => {
        Axios.get(`${rContext.serverUrl}/collection/id/${collectionId}`)
            .then(res => {
                console.log(res.data.data)
            })
    }, [])

    return (
        <div>
            This is a collection page.
        </div>
    )
}
