import { AppBar, Tabs, Tab, Button, IconButton, Toolbar, Typography, createStyles, makeStyles, Theme, MenuItem, Menu } from "@material-ui/core";
import React from "react";
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from "@material-ui/icons";
import { RootContext } from "./contexts/RootContext";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
    const rContext = React.useContext(RootContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const useStyles = makeStyles((theme: Theme) =>
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

    const classes = useStyles();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        rContext.setAuthenticated('false');
        rContext.setAuthBody('');
        rContext.setToken('');

        setAnchorEl(null);
    }

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Funko Folder
                </Typography>

                <Button color="inherit">Home</Button>

                {rContext.authenticated == 'true' && (
                    <React.Fragment>
                        <Button component={RouterLink} to="/wishlist" color="inherit">Wishlist</Button>
                        <Button component={RouterLink} to="/collections" color="inherit">Collections</Button>
                    </React.Fragment>
                )}

                {rContext.authenticated !== 'true' && (
                    <Button component={RouterLink} to="/login" color="inherit">Login</Button>
                )}

                {rContext.authenticated === 'true' && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;