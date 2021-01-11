import { Grid, Card, CardContent, Typography, CardActions, Button, Modal } from '@material-ui/core';
import Axios from 'axios';
import React, { Component } from 'react'
import { RootContext } from '../../contexts/RootContext';
import FunkoAddToCollection from './FunkoAddToCollection';

type FunkoProps = {
    match: any
}
type FunkoState = {
    funkoId: number
    result: any
    styles: any
    successMsg: string
    addToCollectionModalOpen: boolean
}

export default class Funko extends Component<FunkoProps, FunkoState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            funkoId: this.props.match.params.funkoId,
            result: null,
            successMsg: '',
            addToCollectionModalOpen: false,
            styles: {
                root: {
                    width: '100%'
                },
                center: {
                    justifyContent: 'center'
                }
            }
        }

        this.addToWishlist = this.addToWishlist.bind(this);
        this.handleAddToCollectionModalOpen = this.handleAddToCollectionModalOpen.bind(this);
        this.handleAddToCollectionModalClosed = this.handleAddToCollectionModalClosed.bind(this);
    }

    componentDidMount() {
        Axios.get(`${this.context.serverUrl}/funko/${this.state.funkoId}`)
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    result: res.data.data
                })
            })
    }

    addToWishlist() {
        let axiosData = {
            funkoId: this.state.result.id
        }

        Axios.post(`${this.context.serverUrl}/wishlist/addItem`, axiosData, {
            headers: {
                "Authorization": this.context.token
            }
        })
            .then((res) => {
                this.setState({
                    successMsg: 'This funko item has been added to your wishlist!'
                })
            })
    }

    handleAddToCollectionModalOpen() {
        this.setState({
            addToCollectionModalOpen: true
        })
    }

    handleAddToCollectionModalClosed(success: boolean) {
        this.setState({
            addToCollectionModalOpen: false
        })

        if (success) {
            this.setState({
                successMsg: 'This funko item has been added to your collection!'
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.result !== null && <Grid container justify="center" spacing={3}>
                    <Grid item xs={8}>
                        <Card style={this.state.styles.root}>
                            <CardContent>
                                <Typography variant="h2">{this.state.result.title}</Typography>
                                <hr/>
                                <Grid container justify="center">
                                    <Grid item container xs={12} justify="center">
                                        <img alt={this.state.result.handle} src={this.state.result.imageName} />
                                    </Grid>
                                    <Grid item container xs={12} justify="center">
                                        <Typography variant="subtitle1">This funko is apart of the following series: {this.state.result.series.join(', ')}</Typography><br />
                                    </Grid>
                                    <Grid item container xs={12} justify="center">
                                        { this.state.successMsg !== '' &&
                                        <Typography variant="subtitle2" color="primary">{this.state.successMsg}</Typography>}
                                    </Grid>
                                </Grid>

                            </CardContent>
                            <CardActions>
                                {this.context.authenticated === 'true' &&
                                <Grid container justify="center">
                                    <Button onClick={this.addToWishlist}>Add to Wishlist</Button>
                                    <Button onClick={this.handleAddToCollectionModalOpen}>Add to a Collection</Button>
                                </Grid>}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>}
                
                <Modal
                    open={this.state.addToCollectionModalOpen}
                    onClose={() => this.handleAddToCollectionModalClosed(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    style={{display:'flex',alignItems:'center',justifyContent:'center', outline: 0}}
                >
                    <FunkoAddToCollection funkoId={this.state.funkoId} closeModal={this.handleAddToCollectionModalClosed} />
                </Modal>
            </React.Fragment>
        )
    }
}