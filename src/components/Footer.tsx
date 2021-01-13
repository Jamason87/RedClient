import { Grid, Typography } from '@material-ui/core'
import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div style={{
                marginTop: 'auto',
            }}>
                <Grid container justify="space-around">
                    <img style={{width: '200px'}} src="/logo.png" />
                </Grid>
                <Grid container justify="space-around">
                    <Typography variant="caption">&copy; 2021 Joshua Mason</Typography>
                </Grid>
            </div>
        )
    }
}
