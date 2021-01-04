import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RootContext } from '../../contexts/RootContext';
import CollectionListItem from "./CollectionListItem";

function CollectionList() {
    const rContext = useContext(RootContext)

    const [page, setPage] = useState(1);
    const [maxResults, setMaxResults] = useState(10);
    const [totalResults, setTotalResults] = useState(0)
    const [results, setResults] = useState([]);

    useEffect(() => {
        console.log(rContext.serverUrl)

        let axiosData = {
            page: page,
            maxResults: maxResults
        }

        Axios.post(`${rContext.serverUrl}/collection/user`, axiosData, {
            headers: {
                'Authorization': rContext.token
            }
        })
            .then(res => {
                setTotalResults(res.data.data.count);
                setResults(res.data.data.rows);
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [page, maxResults]);

    useEffect(() => {
        console.log(results)
    }, [results])

    return (
        <React.Fragment>
            {
                results.map((result: any) => {
                    return <CollectionListItem id={result.id} name={result.name} description={result.description} />
                })
            }
        </React.Fragment>
    )
}

export default CollectionList;