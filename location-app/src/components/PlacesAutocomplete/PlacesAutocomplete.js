import React, { useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';




const apiKey = process.env.REACT_APP_GMAP_API;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';


function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}

const extractAddress = (place) => {

    const address = {
        city: "",
        state: "",
        zip: "",
        country: "",
        plain() {
            const city = this.city ? this.city + ", " : "";
            const zip = this.zip ? this.zip + ", " : "";
            const state = this.state ? this.state + ", " : "";
            return city + zip + state + this.country;
        }
    }

    if (!Array.isArray(place?.address_components)) {
        return address;
    }

    place.address_components.forEach(component => {
        const types = component.types;
        const value = component.long_name;

        if (types.includes("locality")) {
            address.city = value;
        }

        if (types.includes("administrative_area_level_2")) {
            address.state = value;
        }

        if (types.includes("postal_code")) {
            address.zip = value;
        }

        if (types.includes("country")) {
            address.country = value;
        }

    });

    return address;
}


function PlacesAutocomplete({ setPlaceInfo }) {

    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
    // const [position, setAddress] = useState({});


    const initMapScript = () => {
        if (window.google) {
            return Promise.resolve();
        }
        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src);
    }


    const onChangeAddress = (autocomplete) => {
        const place = autocomplete.getPlace();
        const extractedPlace = extractAddress(place);
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        setAddress({ ...extractedPlace, latitude, longitude });
        setPlaceInfo({ ...extractedPlace, latitude, longitude })
    }

    const initAutocomplete = () => {
        if (!searchInput.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

    }


    const reverseGeocode = ({ latitude: lat, longitude: lng }) => {
        const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
        searchInput.current.value = "Getting your location...";
        fetch(url)
            .then(response => response.json())
            .then(location => {
                const place = location.results[0];
                const _address = extractAddress(place);
                setAddress({ ..._address, latitude: lat, longitude: lng });
                setPlaceInfo({ ..._address, latitude: lat, longitude: lng })
                searchInput.current.value = _address.plain();
            })
    }


    const findMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                reverseGeocode(position.coords)
            })
        }
    }


    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, []);


    return (
        <Grid item xs={12}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <SearchIcon sx={{ ml: '10px' }} />
                <InputBase
                    className="search"
                    inputRef={searchInput}
                    type="text"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Wskaż swoją lokalizację"
                    inputProps={{ 'aria-label': 'Wskaż swoją lokalizację' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton onClick={findMyLocation} color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <GpsFixedIcon />
                </IconButton>
            </Paper>

            <Box className="address" sx={{ mt: 4 }}>
                <Typography variant="h6" component="h4">
                    Miasto: {address.city} {address.latitude}
                </Typography>
                <Typography variant="h6" component="h4">
                    Województwo: {address.state}
                </Typography>
                <Typography variant="h6" component="h4">
                    Kod pocztowy: {address.zip}
                </Typography>
                <Typography variant="h6" component="h4">
                    Kraj: {address.country}
                </Typography>
            </Box>

        </Grid>
    )
}

export default PlacesAutocomplete