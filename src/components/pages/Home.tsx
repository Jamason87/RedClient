import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import FeaturedFunko from './funko/FeaturedFunko'
import Search from './search/Search'

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <FeaturedFunko />
                <Grid justify="space-around" container>
                    <Grid item xs={6}>
                        <Search />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}