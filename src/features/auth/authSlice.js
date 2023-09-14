import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {doc, serverTimestamp, setDoc} from "firebase/firestore";

import {uploadImage} from "../../storage";
import {auth, db} from "../../firebase";

const initialState = {
  user: null,
  isMessage: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      if (
        !user.firstName ||
        !user.lastName ||
        !user.email ||
        !user.password ||
        !user.confirmPassword ||
        !user.profileImage
      ) {
        return thunkAPI.rejectWithValue("Please fill all the fields.");
      } else if (user.password !== user.confirmPassword) {
        return thunkAPI.rejectWithValue(
          "Password and confirm password not match."
        );
      } else {
        const profileImage = await uploadImage(
          user.profileImage,
          `${user.email}`
        );
        const response = await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        );
        const obj = {...user, profileImage};
        delete obj.password;
        delete obj.confirmPassword;
        await setDoc(doc(db, "users", response.user.uid), {
          ...obj,
          timestamp: serverTimestamp(),
        });
        return "register success.";
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    if (!user.email || !user.password) {
      return thunkAPI.rejectWithValue("Please fill all the fields.");
    } else {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      return "login success.";
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return "logout success.";
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isMessage = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isMessage = true;
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isMessage = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isMessage = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isMessage = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isMessage = true;
        state.message = action.payload;
      });
  },
});

export const {setUser, reset} = authSlice.actions;
export default authSlice.reducer;
