import { TableRow, TableCell, makeStyles, Paper, Table, TableBody, TableContainer, TableHead } from "@material-ui/core";
import CollectionTableItem from "./CollectionTableItem";
import React, { Component } from 'react'

type CollectionTableProps = {
    funkos: Array<number>
}

type CollectionTableState = {
    classes: any
}

export default class CollectionTable extends Component<CollectionTableProps, CollectionTableState> {

    constructor(props: any) {
        super(props);

        this.state = {
            classes: this.useStyles()
        }
    }

    useStyles() {
        return makeStyles({
            table: {
                width: '650px'
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <TableContainer component={Paper}>
                    <Table className={this.state.classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Funko Item</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.funkos.map((id: number) => {
                                    return <CollectionTableItem key={id} funkoId={id} />
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        )
    }
}
