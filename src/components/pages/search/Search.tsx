import { Grid, Paper, TextField } from '@material-ui/core';
import React, { Component } from 'react'
import SearchList from './SearchList';

type SearchProps = {};
type SearchState = {
    searchQuery: string
}

export default class Search extends Component<SearchProps, SearchState> {

    constructor(props: any) {
        super(props);

        this.state = {
            searchQuery: ''
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <form noValidate autoComplete="off" onSubmit={(e) => {e.preventDefault()}}>
                                <TextField style={{width: "100%"}} id="outlined-basic" label="Search" variant="outlined" onChange={(e) => { e.preventDefault(); this.setState({ searchQuery: e.target.value }) }} />
                            </form>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <SearchList query={this.state.searchQuery} />
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
