import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import { places } from "../../api/exampleApi";
import { useSelector } from 'react-redux';
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


export const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `800px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(({ places, currentPin }) =>
    <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
        {console.log(currentPin)}
        <Toolbar />
        <Typography paragraph>
            <GoogleMap
                defaultZoom={8}
                center={{ lat: currentPin.lat, lng: currentPin.long }}
            // defaultOptions={{ styles: { display: 'none' } }}
            // defaultCenter={{ lat: currentPin.lat, lng: currentPin.long }}
            >
                {places.length && places.map((place, i) => (
                    <>
                        <InfoBox
                            defaultPosition={{ lat: Number(place.lat), lng: Number(place.long) }}
                            options={{ closeBoxURL: ``, enableEventPropagation: true }}
                        >
                            <Paper style={{ backgroundColor: place.active ? `blue` : `yellow`, opacity: 0.75, padding: `12px` }}>
                                <Typography style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                                    {place.firstName} {place.lastName}
                                </Typography>
                            </Paper>
                        </InfoBox>
                        <Marker position={{ lat: Number(place.latitude), lng: Number(place.longitude) }} />
                    </>
                ))}
            </GoogleMap>
        </Typography>
    </Box>
);



const MyMap = () => {
    const users = useSelector((state) => state.usersReducer.places);
    const currentPin = useSelector((state) => state.usersReducer.currentPin);
    console.log(users, currentPin)
    return (
        <Map places={users} currentPin={currentPin} />
    );
}

export default MyMap;