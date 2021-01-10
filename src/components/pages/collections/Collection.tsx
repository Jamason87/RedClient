import { Card, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import Axios from 'axios'
import React, { Component } from 'react'
import { RootContext } from '../../contexts/RootContext';

type CollectionProps = {
    match: any
}

type CollectionState = {
    result: any,
    collectionId: any,
    styles: any
}

export default class Collection extends Component<CollectionProps, CollectionState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props)

        this.state = {
            collectionId: this.props.match.params.collectionId,
            result: null,
            styles: {
                root: {
                    width: '100%'
                }
            }
        }
    }

    componentDidMount() {
        Axios.get(`${this.context.serverUrl}/collection/id/${this.state.collectionId}`)
            .then(res => {
                console.log(res.data.data);

                this.setState({
                    result: res.data.data
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.result !== null && <Grid container justify="center" spacing={3}>
                    <Grid item xs={8}>
                        <Card style={this.state.styles.root}>
                            <CardContent>
                                <Typography variant="h2">{this.state.result.name}</Typography>
                                <hr/>
                                <Typography variant="subtitle1">{this.state.result.description}</Typography>
                                <hr/>
                                {(this.state.result.funkos.length !== 0) ?
                                        this.state.result.funkos.map((funko: any) => {
                                            return <div>FUNKO PLACEHOLDER</div>
                                        }) : <Typography variant="subtitle1">You have no funkos in this collection, consider adding one to begin.</Typography>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>}
            </React.Fragment>
        )
    }
}
