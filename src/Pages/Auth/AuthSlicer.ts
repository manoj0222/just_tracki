import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CreateUserPayload from "../../interfaces/CreateUserPayload";

interface AuthState {
  userId: string;
  password: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  userId: "",
  password: "",
  status: "idle",
  error: null,
};

export const createUser: any = createAsyncThunk(
  "user/create",
  async (payload: CreateUserPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/users", payload);
      return response.data;
    } catch (error: any) {
      if (error.response.status === 409) {
        return rejectWithValue("User already exists");
      }
      return rejectWithValue(`Error creating user: ${error.message}`);
    }
  }
);

export const findUserById: any = createAsyncThunk(
  "user/findById",
  async (userId: string, { rejectWithValue }) => {
    console.log(userId);
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue("User not found");
    } catch (error: any) {
      return rejectWithValue(`Error fetching user: ${error.message}`);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      sessionStorage.clear();
      (state.userId = ""), (state.password = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<CreateUserPayload>) => {
          state.userId = action.payload.userId;
          state.password = action.payload.password;
          state.status = "succeeded";
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(
        findUserById.fulfilled,
        (state, action: PayloadAction<CreateUserPayload>) => {
          state.userId = action.payload.userId;
          state.status = "succeeded";
        }
      )
      .addCase(findUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(findUserById.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
