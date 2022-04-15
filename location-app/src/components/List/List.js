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
import { fetchMarkers, addMarker, pickMarker } from '../../redux/markersSlice';
import { findNonSerializableValue } from '@reduxjs/toolkit';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
    const dispatch = useDispatch();
    const markers = useSelector((state) => state.markersReducer.places)

    useEffect(() => {
        dispatch(fetchMarkers());
    }, [])


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        App
                    </Typography>
                </Toolbar>
            </AppBar>
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
                    {markers.map((place) => (
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