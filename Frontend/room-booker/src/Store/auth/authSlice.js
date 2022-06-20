import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginAPI } from '../../Services/user.service';

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (userLoginInfo, thunkAPI) => {
    const response = await loginAPI(userLoginInfo)
    console.log(response)
    return {
      email: response.user?.email,
      first_name: response.user?.first_name,
      last_name: response.user?.last_name,
      token: response.access_token
    }
  }
)

const initialState = {
    user: {
      email: "",
      firstName: "",
      lastName: "",
      token: ""
    },
    loginState: "loggedOut"
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem("auth")) || initialState,
  reducers: {
    logout: (state) => {
        state = initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(action)
      state.loginState = "loggedIn"
      state.user = action.payload
      console.log(state.loginState)
    })
    .addCase(userLogin.pending, (state, action) => {
      console.log("pending")
      state.loginState = "loggingIn"
    })
    .addCase(userLogin.rejected, (state, action) => {
      console.log("rejected")
      state.loginState = initialState
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer