import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { places } from '../../api/exampleApi';
import { useSelector, useDispatch } from 'react-redux';
import { check } from '../../redux/markersSlice';
// import { fetchMarkers, addMarker, pickMarker } from '../../redux/markersSlice';
import { fetchUsers, pickMarker } from '../../redux/usersSlice';
import { logOut } from '../../redux/usersSlice';
import { findNonSerializableValue } from '@reduxjs/toolkit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom"

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const drawerWidth = 240;

export default function PermanentDrawerLeft({ userIsLoggedIn }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const markers = useSelector((state) => state.markersReducer.places)
    const users = useSelector((state) => state.usersReducer.places)
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        console.log(setting)
        if (setting === 'Logout') {
            onLogOut()
        }
        setAnchorElUser(null);
    };

    const onLogOut = () => {
        localStorage.removeItem("user")
        dispatch(logOut())
        navigate("/login")
    }

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            App
                        </Typography>
                        {userIsLoggedIn ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (
                            <>
                                <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
                                <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {users.map((place) => (
                        // <ListItem onClick={() => dispatch(addMarker())} button key={place._id}>
                        <ListItem onClick={() => dispatch(pickMarker(place._id))} button key={place._id} style={{ backgroundColor: place.active ? `blue` : `transparent` }}>
                            {/* <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon> */}
                            <ListItemText primary={place.firstName + " " + place.lastName} />
                        </ListItem>
                    ))}
                </List>
                {/* <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
            </Drawer>
        </Box>
    );
}