import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginAPI } from '../../Services/user.service';
import { AuthState } from '../../Models/State/AuthState';
import { LoginState } from '../../Enums/LoginState';
import { UserSerializer } from '../../Serializers/UserSerializer';
import { User } from '../../Models/User';

export const userLogin = createAsyncThunk(
  'auth/userLogin',
  async (userLoginInfo: any, thunkAPI) => {
    const userSerializer: UserSerializer = new UserSerializer();
    const response = await loginAPI(userLoginInfo)
    const user: User = userSerializer.fromJson(response.user, response.access_token)
    return user
  }
)

// export const userLogin = createAsyncThunk(
//   'auth/userLogout',
//   async (thunkAPI) => {
//     dispatch(logout())
//     dispatch(push('/login'))
//   }
// )

const initialState: AuthState = {
    user: {
      user_id: 0,
      email: "",
      first_name: "",
      last_name: "",
      token: "",
      company_id: 0
    },
    loginState: LoginState.LoggedOut
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem("auth") ?? JSON.stringify(initialState)),
  reducers: {
    logout: (state) => {
        return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loginState = LoginState.LoggedIn
      state.user = action.payload
    })
    .addCase(userLogin.pending, (state, action) => {
      state.loginState = LoginState.LoggingIn
    })
    .addCase(userLogin.rejected, (state, action) => {
      state.loginState = initialState
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer