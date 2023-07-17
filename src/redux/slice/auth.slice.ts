import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
// import {auth} from 'src/hooks/useFirebase';
import {User} from '@react-native-google-signin/google-signin';

// export const rehydrateAuthSlice = createAsyncThunk(
//   'auth/rehydrate',
//   async () => {
// const user = auth.currentUser;
// return user ? generateState(user) : null;
//   },
// );

export interface AuthSliceInterface {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthSliceInterface = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  //   extraReducers: builder => {
  // builder.addCase(incrementAsync.pending, (state, action) => {
  //   state.status = 'loading';
  // });
  // builder.addCase(incrementAsync.fulfilled, (state, action) => {
  //   state.status = 'idle';
  //   state.value += action.payload;
  // });
  //   },
  reducers: {
    invalidateUser: () => {
      return {
        user: null,
        isAuthenticated: false,
      };
    },
    setUser: (_, action: PayloadAction<User | null>) => {
      return {
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    },
    // rehydrateAuthSlice: () => {
    //   return auth.currentUser ? generateState(auth.currentUser) : null;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, invalidateUser} = authSlice.actions;

export default authSlice.reducer;
