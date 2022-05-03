import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
// import { places } from '../api/exampleApi';
// import { api } from '../api/api.json';


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const allUsers = await axios.get("/users");
            // setPins(allPins.data);
            console.log(allUsers);
            return allUsers;
        } catch (err) {
            console.log(err);
        }
    }
)


const initialUser = JSON.parse(localStorage.getItem('user'))

export const registerUser = createAsyncThunk(
    'users/register',
    async ({ email, password, firstName, lastName, long, lat, userType }) => {
        const newUser = {
            "username": email,
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "long": long,
            "lat": lat,
            "userType": userType,
            "topics": []
        };

        try {
            const res = await axios.post("/users/register", newUser);
            console.log(res)
            return res
        } catch (err) {
            console.log(err);
        }
    }
)

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }) => {
        const curUser = {
            "username": email,
            "password": password,
            "isLoggedIn": true
        };

        try {
            const res = await axios.post("/users/login", curUser);
            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify({
                    ...res.data,
                    isLoggedIn: true
                }))
            } else {
                localStorage.removeItem("user")
            }
            console.log(res)
            return res
        } catch (err) {
            console.log(err);
        }
    }
)



export const userSlice = createSlice({
    name: 'user',
    initialState: {
        places: [],
        currentPin: {
            lat: 50,
            long: 20,
        },
        _id: '',
        username: '',
        email: '',
        isLoggedIn: false,
        loading: false,
        ...initialUser
    },
    reducers: {
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
        logOut: (state) => {
            state = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.places.push(...action.payload.data);
            console.log(state, action.payload.data)
            state._id = action.payload.data._id;
            state.username = action.payload.data.username;
            state.email = action.payload.data.email;
            state.firstName = action.payload.data.email;
            state.lastName = action.payload.data.email;
            state.long = action.payload.data.email;
            state.lat = action.payload.data.email;
            // state.userType = action.payload.data.userType;
            state.topics = action.payload.data.email;
            state.isLoggedIn = true;
            state.loading = false;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state._id = '';
            state.username = '';
            state.email = '';
            state.isLoggedIn = false;
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.places.push(...action.payload.data);
            state.loading = false;
        })
        // builder.addCase(addMarker.pending, (state, action) => {
        //     state.loading = true;
        // })
        // builder.addCase(addMarker.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.places.push(action.payload.data);
        // })
        // builder.addCase(addMarker.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // })
    },
})

// Action creators are generated for each case reducer function
export const { logOut, pickMarker } = userSlice.actions;

export default userSlice.reducer;































// import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
// import axios from 'axios';
// // import { places } from '../api/exampleApi';
// // import { api } from '../api/api.json';


// // export const fetchMUsers = createAsyncThunk(
// //     'users/fetchUsers',
// //     async () => {
// //         try {
// //             const allUsers = await axios.get("/users");
// //             // setPins(allPins.data);
// //             console.log(allUsers);
// //             return allUsers;
// //         } catch (err) {
// //             console.log(err);
// //         }
// //     }
// // )

// const initialUser = JSON.parse(localStorage.getItem('user'));

// export const registerUser = createAsyncThunk(
//     'users/register',
//     async ({ email, password }) => {
//         const newUser = {
//             "username": email,
//             "email": email,
//             "password": password,
//         };

//         try {
//             const res = await axios.post("/users/register", newUser);
//             console.log(res)
//             return res
//         } catch (err) {
//             console.log(err);
//         }
//     }
// )

// export const loginUser = createAsyncThunk(
//     'users/login',
//     async ({ email, password }) => {
//         const curUser = {
//             "username": email,
//             "password": password,
//         };

//         try {
//             const res = await axios.post("/users/login", curUser);
//             if (res.status === 200) {
//                 localStorage.setItem("user", JSON.stringify(res.data))
//             } else {
//                 localStorage.removeItem("user")
//             }
//             console.log(res)
//             return res
//         } catch (err) {
//             console.log(err);
//         }
//     }
// )



// export const counterSlice = createSlice({
//     name: 'user',
//     initialState: {
//         ...initialUser, 
//         loading: false
//     },
//     reducers: {
//         logoutSuccess: (state, action) => {
//             state = null;
//             localStorage.removeItem('user')
//             console.log("LOGOUTTTT")
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(loginUser.pending, (state, action) => {
//             state.loading = true;
//         })
//         builder.addCase(loginUser.fulfilled, (state, action) => {
//             // console.log(state, action.payload.data)
//             localStorage.setItem('user', JSON.stringify(action.payload))
//             state = {...action.payload.data};
//             state.loading = false;
//         })
//         builder.addCase(loginUser.rejected, (state, action) => {
//             state = null;
//             state.loading = false;
//         })
//         // builder.addCase(addMarker.pending, (state, action) => {
//         //     state.loading = true;
//         // })
//         // builder.addCase(addMarker.fulfilled, (state, action) => {
//         //     state.loading = false;
//         //     state.places.push(action.payload.data);
//         // })
//         // builder.addCase(addMarker.rejected, (state, action) => {
//         //     state.loading = false;
//         //     state.error = action.payload;
//         // })
//     },
// })

// // Action creators are generated for each case reducer function
// export const { loginSuccess, logoutSuccess } = counterSlice.actions

// export default counterSlice.reducer