import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { places } from '../api/exampleApi';
// import { api } from '../api/api.json';


export const fetchMarkers = createAsyncThunk(
    'users/fetchMarkers',
    async () => {
        try {
            const allPins = await axios.get("/pins");
            // setPins(allPins.data);
            console.log(allPins);
            return allPins;
        } catch (err) {
            console.log(err);
        }
    }
)

export const addMarker = createAsyncThunk(
    'users/addMarker',
    async () => {
        const newPin = {
            "firstName": "pawel321",
            "lastName": "nowik",
            "title": "boss3213",
            "desc": "to ja",
            "rating": 5,
            "long": 150.644,
            "lat": -34.397,
            "active": false
        };

        try {
            const res = await axios.post("/pins", newPin);
            // setPins([...pins, res.data]);
            // setNewPlace(null);
            console.log(res)
            return res
        } catch (err) {
            console.log(err);
        }
    }
)



export const counterSlice = createSlice({
    name: 'markers',
    initialState: {
        places: [],
        loading: false,
        currentPin: {
            lat: -32.397,
            long: 151.644,
        },
    },
    reducers: {
        check: (state, action) => {
            fetchMarkers()
            // console.log(state.markers, action)
            state.places = [...state.places, {
                id: 1,
                firstName: 'Jan222',
                lastName: 'Kowalski222',
                latitude: -32.397,
                longitude: 151.644,
            }]
        },
        pickMarker: (state, action) => {
            // console.log('sadsadsadsa', current(state.places).filter(a => a._id === action.payload)[0].active)
            // state.places = state.places.map(place => place.active = false)
            const currentPlace = current(state.places).find(place => place._id === action.payload ? place : null)
            console.log(currentPlace.lat, currentPlace.long)
            state.currentPin = {
                lat: currentPlace.lat,
                long: currentPlace.long
            }
            state.places = state.places.map(place => place._id === action.payload ? { ...place, active: !place.active } : { ...place, active: false })
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMarkers.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchMarkers.fulfilled, (state, action) => {
            state.loading = false;
            state.places.push(...action.payload.data);
        })
        builder.addCase(fetchMarkers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(addMarker.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(addMarker.fulfilled, (state, action) => {
            state.loading = false;
            state.places.push(action.payload.data);
        })
        builder.addCase(addMarker.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})

// Action creators are generated for each case reducer function
export const { check, uncheck, incrementByAmount, pickMarker } = counterSlice.actions

export default counterSlice.reducer