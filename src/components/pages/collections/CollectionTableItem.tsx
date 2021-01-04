import { TableRow, TableCell } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";

function CollectionTableItem(props: any) {
    const [name, setName] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        Axios.get(`http://localhost:4002/funko/${props.funkoId}`)
            .then(res => {
                setName(res.data.data.title)
                setImageUrl(res.data.data.imageName)
            })
    }, [])

    return (
        <React.Fragment>
            {
                name && (
                <TableRow>
                    <TableCell>{name} - <img src={imageUrl} /></TableCell>
                </TableRow>)
            }
        </React.Fragment>
    );
}

export default CollectionTableItem;