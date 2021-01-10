import classes from "*.module.css";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Modal } from "@material-ui/core";
import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RootContext } from '../../contexts/RootContext';
import CollectionsAdd from "./CollectionsAdd";

type CollectionsListProps = {
    page: number,
    maxResults: number
}

type CollectionsListState = {
    totalResults: number,
    results: Array<any>,
    addModalOpen: boolean
}

export default class CollectionsList extends Component<CollectionsListProps, CollectionsListState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            totalResults: 0,
            results: [],
            addModalOpen: false
        }

        this.handleAddModalOpen = this.handleAddModalOpen.bind(this);
        this.handleAddModalClosed = this.handleAddModalClosed.bind(this);
    }

    loadData() {
        let axiosData = {
            page: this.props.page,
            maxResults: this.props.maxResults
        }

        Axios.post(`${this.context.serverUrl}/collection/user`, axiosData, {
            headers: {
                'Authorization': this.context.token
            }
        })
            .then(res => {
                this.setState({
                    totalResults: res.data.data.count,
                    results: res.data.data.rows
                })

                console.log(res.data.data.rows)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.page !== this.props.page) {
            this.loadData();
        }
    }

    handleAddModalOpen() {
        this.setState({
            addModalOpen: true
        })
    }

    handleAddModalClosed() {
        this.setState({
            addModalOpen: false
        })

        this.loadData();
    }

    render() {
        return (
            <React.Fragment>
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" onClick={this.handleAddModalOpen}>Add</Button>
                </Grid>
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Collection Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="right"># of Items</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.results.map((result: any) => (
                        <TableRow key={result.id}>
                        <TableCell component="th" scope="row">
                            <Link to={`/collection/${result.id}`}>{result.name}</Link>
                        </TableCell>
                        <TableCell align="left">{result.description}</TableCell>
                        <TableCell align="right">{0}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>



                <Modal
                    open={this.state.addModalOpen}
                    onClose={this.handleAddModalClosed}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    style={{display:'flex',alignItems:'center',justifyContent:'center', outline: 0}}
                >
                    <CollectionsAdd closeModal={this.handleAddModalClosed} />
                </Modal>
            </React.Fragment>
        )
    }
}
