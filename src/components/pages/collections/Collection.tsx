import { Button, Card, CardContent, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { RootContext } from '../../contexts/RootContext';
import EditCollectionModal from './EditCollectionModal';

type CollectionProps = {
    match: any,
    history?: any
}

type CollectionState = {
    result: any,
    collectionId: number,
    styles: any,
    funkos: Array<any>,
    editCollectionModalOpen: boolean
}

export default class Collection extends Component<CollectionProps, CollectionState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props)

        this.state = {
            collectionId: this.props.match.params.collectionId,
            result: null,
            funkos: [],
            styles: {
                root: {
                    width: '100%'
                }
            },
            editCollectionModalOpen: false
        }

        this.handleEditCollectionModalClosed = this.handleEditCollectionModalClosed.bind(this);
        this.handleEditCollectionModalOpen = this.handleEditCollectionModalOpen.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        Axios.get(`${this.context.serverUrl}/collection/id/${this.state.collectionId}`)
            .then(res => {
                console.log(res.data.data);

                this.setState({
                    result: res.data.data
                })

                this.getFunkoData(res.data.data.funkos);
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
            collectionId: this.state.collectionId,
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

    handleEditCollectionModalOpen() {
        this.setState({
            editCollectionModalOpen: true
        })
    }

    handleEditCollectionModalClosed(success: boolean, redirect: boolean) {
        this.setState({
            editCollectionModalOpen: false
        })

        if (success) this.loadData()
        if (redirect) this.props.history.push('/collections')
    }

    render() {
        return (
            <React.Fragment>
                {this.state.result !== null && <Grid container justify="center" spacing={3}>
                    <Grid item xs={8}>
                        <Card style={this.state.styles.root}>
                            <CardContent>
                                <Typography variant="h2">{this.state.result.name}</Typography>
                                <hr />
                                <Typography variant="subtitle1">{this.state.result.description} - <Button onClick={this.handleEditCollectionModalOpen}>Edit</Button></Typography>
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
                                            }) : <Typography variant="subtitle1">You have no funkos in this collection, consider adding one to begin.</Typography>
                                        }
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>}
                
                <Modal
                    open={this.state.editCollectionModalOpen}
                    onClose={() => this.handleEditCollectionModalClosed(false, false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    style={{display:'flex',alignItems:'center',justifyContent:'center', outline: 0}}
                >
                    <EditCollectionModal collection={this.state.result} closeModal={this.handleEditCollectionModalClosed} />
                </Modal>
            </React.Fragment>
        )
    }
}
