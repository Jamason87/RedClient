import { Grid, Card, CardContent, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RootContext } from "../../contexts/RootContext";
import CollectionTable from "./CollectionTable";

type WishlistProps = {
    component: any
}

type WishlistState = {
    funkos: []
    result: any,
    styles: any
}

export default class Wishlist extends Component<WishlistProps, WishlistState> {

    static contextType = RootContext;

    constructor(props: any) {
        super(props)

        this.state = {
            funkos: [],
            result: null,
            styles: {
                root: {
                    width: '100%'
                }
            },
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        Axios.get(`${this.context.serverUrl}/collection/wishlist`, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then(res => {
                console.log(res.data.wishlist);

                this.setState({
                    result: res.data.wishlist
                })

                this.getFunkoData(res.data.wishlist.funkos);
            })
    }

    getFunkoData(funkoIds: Array<number>) {
        if (funkoIds.length === 0) {
            this.setState({
                funkos: []
            })
        } else {

        Axios.post(`${this.context.serverUrl}/funko/getall`, { funkoIds })
            .then((res: any) => {
                console.log(res.data.funkos)

                this.setState({
                    funkos: res.data.funkos
                })
            })
        }
    }

    deleteFunko(funkoId: number) {
        //REMOVE from the array,
        //Update the collection list to remove the funko

        let funkos: Array<number> = this.state.funkos.map((f: any) => f.id)
        funkos.splice(funkos.indexOf(funkoId), 1)
        this.getFunkoData(funkos);

        let axiosData = {
            collectionId: this.state.result.id,
            name: this.state.result.name,
            description: this.state.result.description,
            funkos: funkos
        }

        Axios.post(`${this.context.serverUrl}/collection/update`, axiosData, {
            headers: {
                "Authorization": this.context.token
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.result !== null && <Grid container justify="center" spacing={3}>
                    <Grid item xs={8}>
                        <Card style={this.state.styles.root}>
                            <CardContent>
                                <Typography variant="h2">Wishlist</Typography>
                                <hr />
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Funkos</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(this.state.funkos.length !== 0) ?
                                            this.state.funkos.map((funko: any) => {
                                                return (
                                                    <TableRow key={funko.id}>
                                                        <TableCell><Link to={`/funko/${funko.id}`}>{funko.title}</Link></TableCell>
                                                        <TableCell align="right">
                                                            <IconButton onClick={() => {this.deleteFunko(funko.id)}}>
                                                                <DeleteForever />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }) : <Typography variant="subtitle1">You have no funkos in your wishlist, consider adding one to begin.</Typography>
                                        }
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>}
            </React.Fragment>
        )
    }
}
