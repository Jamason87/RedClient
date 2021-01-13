import { Grid, Paper } from '@material-ui/core';
import Axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { RootContext } from '../../contexts/RootContext';

type FeaturedFunkoProps = {}
type FeaturedFunkoState = {
    funkos:any
    result:any
}

export default class FeaturedFunko extends Component<FeaturedFunkoProps, FeaturedFunkoState> {
    static contextType=RootContext;
    constructor(props: any) {
        super(props);

        this.state = {
            funkos: [36, 209, 1857, 1747, 332, 136],
            result: null
        }
    }

    componentDidMount (){
        Axios.post(`${this.context.serverUrl}/funko/getall`, {
            funkoIds: this.state.funkos
        })
            .then(res => {
                console.log(res.data.funkos)

                this.setState({
                    result: res.data.funkos
                })
            })
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} container justify="space-around"><h2>Featured Funkos</h2></Grid>
                    {this.state.result !== null && this.state.result.map((r: any) => {
                        return <Grid item xs={2}><Link to={`/funko/${r.id}`}><img style={{width: '100%'}} alt={r.handle} src={r.imageName}/></Link></Grid>
                    })}
                </Grid>
            </div>
        )
    }
}