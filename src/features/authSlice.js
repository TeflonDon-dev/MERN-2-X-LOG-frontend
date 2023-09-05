import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";


const initialState = {
    token: localStorage.getItem("token"),
    firstname: "",
    lastname:"",
    email: "",
    _id: "",
    image:"",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded:false,
}

export const signUpUser = createAsyncThunk("signUpUser", async (user, { rejectWithValue }) => {
    try {

        const token = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/signup`, {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            confirmpassword: user.confirmpassword,
            image:user.image,
        });
        localStorage.setItem("token", token.data);

        return token.data
        
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
});



export const loginUser = createAsyncThunk("loginUser", async (user, { rejectWithValue }) => {
    try {
        const token = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/login`, {
            email: user.email,
            password: user.password,
            
        
        });

        localStorage.setItem("token", token.data);

        return token.data

    } catch (error) {
         console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadUser(state) {
            const token = state.token;
            
            if (token) {
                const user = jwtDecode(token);
                return {
                    ...state,
                    token,
                    firstname: user.firstname,
                     lastname: user.lastname,
                    email: user.email,
                    _id: user._id,
                       image:user.image,
                     userLoaded:true
                }
            }else return {...state,userLoaded:true}
        },
        logOutUser(state, action) {
            localStorage.removeItem("token");

            return {
                ...state,
                 token:"",
                firstname: "",
                lastname:"",
                email: "",
                _id: "",
                image: "",
                registerStatus: "", 
                registerError:"",
                loginStatus: "",
                loginError: "",
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signUpUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" }
        }).addCase(signUpUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    firstname: user.firstname,
                    lastname:user.lastname,
                    email: user.email,
                    _id: user._id,
                    image:user.image,
                    registerStatus: "success"
                }
            } else {
                return state
            }
        }).addCase(signUpUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload
            }
        });
          builder.addCase(loginUser.pending, (state, action) => {
            return{...state,loginStatus:"pending"}
        }).addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                
                const user = jwtDecode(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    firstname: user.firstname,
                    lastname:user.lastname,
                    email: user.email,
                    _id: user._id,
                    image:user.image,
                    loginStatus:"success"
                }
            } else {
                return state
            }
        }).addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError:action.payload,
            }
        })
        
    }
})

export default authSlice.reducer;

export const { logOutUser,loadUser } = authSlice.actions;
