import { TableRow, TableCell, makeStyles, Paper, Table, TableBody, TableContainer, TableHead } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import CollectionTableItem from "./CollectionTableItem";

const useStyles = makeStyles({
    table: {
        width: '650px'
    }
})

function CollectionTable(props: any) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Funko Item</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.funkos.map((id: number) => {
                                return <CollectionTableItem funkoId={id} />
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default CollectionTable;