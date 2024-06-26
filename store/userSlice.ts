import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';

export const registerAsync = createAsyncThunk('auth/register', async (userData: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post('https://api.developbetterapps.com/users', userData);
    return response.data
  } catch (error) {
    console.log(`Registration error ${error}`);
  }
})

export const loginAsync = createAsyncThunk('auth/login', async (userData: { email: string, password: string }, { rejectWithValue })=>{
  try{
    const response = await axios.post("https://api.developbetterapps.com/auth", userData)
    const token = response.data.token;
    await AsyncStorage.setItem('userToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Attach token to all future requests
    return token;
  }catch(error){
    console.log(`Login error ${error}`)
  }
})

export const checkLoginStatus = createAsyncThunk(
  'auth/checkLoginStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token ? { isAuthenticated: true, token } : { isAuthenticated: false };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState:{
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAsync: (state) => {
      AsyncStorage.removeItem('userToken'); // Remove token from AsyncStorage
      delete axios.defaults.headers.common['Authorization']; // Remove token from Axios headers
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null
      };
    },
  },
  extraReducers(builder) {
    builder
    // Register reducer
      .addCase(registerAsync.fulfilled, (state, action: PayloadAction<any>)=>{
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login reducer
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
        state.token = action.payload
      })
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // check login status
      .addCase(checkLoginStatus.pending, state => {
        state.loading = true;
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.token = action.payload || null;
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export const {logoutAsync} = userSlice.actions

export default userSlice.reducer
