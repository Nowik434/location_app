import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
// import { places } from '../api/exampleApi';
// import { api } from '../api/api.json';


// export const fetchMUsers = createAsyncThunk(
//     'users/fetchUsers',
//     async () => {
//         try {
//             const allUsers = await axios.get("/users");
//             // setPins(allPins.data);
//             console.log(allUsers);
//             return allUsers;
//         } catch (err) {
//             console.log(err);
//         }
//     }
// )

export const registerUser = createAsyncThunk(
    'users/register',
    async ({ email, password }) => {
        const newUser = {
            "username": email,
            "email": email,
            "password": password,
        };

        try {
            const res = await axios.post("/users/register", newUser);
            // setPins([...pins, res.data]);
            // setNewPlace(null);
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
        };

        try {
            const res = await axios.post("/users/login", curUser);
            if (res.status === 200) {
                localStorage.setItem("token", res.data._id)
            }
            console.log(res)
            return res
        } catch (err) {
            console.log(err);
        }
    }
)



export const counterSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        username: '',
        email: '',
        loading: false,
    },
    reducers: {
        register: (state, action) => {
            // console.log(state.markers, action)
            state = [...state, {
                _id: '',
                username: 'fdfdff',
                email: '543543',
                loading: false,
            }]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(state, action.payload.data)
            state._id = action.payload.data._id;
            state.username = action.payload.data.username;
            state.email = action.payload.data.email;
            state.loading = false;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
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
// export const { check, uncheck, incrementByAmount, pickMarker } = counterSlice.actions

export default counterSlice.reducer