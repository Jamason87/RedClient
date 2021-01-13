import { AppBar, Button, IconButton, Toolbar, Typography, createStyles, makeStyles, Theme, MenuItem, Menu } from "@material-ui/core";
import React, { Component } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from "@material-ui/icons";
import { RootContext } from "./contexts/RootContext";
import { Link, Link as RouterLink } from "react-router-dom";
import Admin from "./admin/Admin";

type NavbarProps = {

}

type NavbarState = {
    classes: any,
    anchorEl: any,
    open: boolean
}

export default class Navbar extends Component<NavbarProps, NavbarState> {
    static contextType = RootContext;

    constructor(props: any) {
        super(props);

        this.state = {
            classes: this.useStyles(),
            anchorEl: null,
            open: Boolean(false)
        }

        this.setState({
            open: Boolean(this.state.anchorEl)
        })

        this.handleClose = this.handleClose.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleMenu(event: React.MouseEvent<HTMLElement>) {
        this.setState({
            anchorEl: event.currentTarget
        })
    };

    handleClose() {
        this.setState({
            anchorEl: null
        })
    };

    handleLogout() {
        this.context.setAuthenticated('false');
        this.context.setAuthBody('');
        this.context.setToken('');

        this.setState({
            anchorEl: null
        })
    }

    useStyles() {
        return makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );
    }

    render() {
        return (
            <AppBar position="static" className={this.state.classes.root}>
                <Toolbar>
                    <IconButton edge="start" className={this.state.classes.menuButton} color="inherit" aria-label="menu">
                        <Link to="/"><img style={{width: '64px'}} src="/logo.png" /></Link>
                    </IconButton>

                    <div style={{flex: 1}}></div>
    
                    <Button component={RouterLink} to="/" color="inherit">Home</Button>
    
                    {this.context.authenticated === 'true' && (
                            <Button component={RouterLink} to="/wishlist" color="inherit">Wishlist</Button>
                    )}
                    
                    {this.context.authenticated === 'true' && (
                            <Button component={RouterLink} to="/collections" color="inherit">Collections</Button>
                    )}
    
                    {this.context.authenticated !== 'true' && (
                        <Button component={RouterLink} to="/login" color="inherit">Login</Button>
                    )}
    
                    {this.context.authenticated === 'true' && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                {this.context.isAdmin ? <Link style={{ textDecoration: 'none', color: 'black'}}to="/admin"><MenuItem>Admin</MenuItem></Link> : ''}
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}
