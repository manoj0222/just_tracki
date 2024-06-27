import Status from "../../enum/Status";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CreateUserPayload from "../../interfaces/CreateUserPayload";

const initialState = {
  userid: "",
  password: "",

};

const AuthSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        createUser.fulfilled,
        (state, action: PayloadAction<CreateUserPayload>) => {
          state.userid = action.payload.userId;
        }
      ).addCase(
        findUserById.fulfilled,
        (state, action: PayloadAction<CreateUserPayload>) => {
          state.userid = action.payload.userId;
        }
      );
  },
});

export const createUser: any = createAsyncThunk(
  "user/create",
  async (payload: CreateUserPayload) => {
    try {
      const { userId, password } = payload;
      const response = await axios.post("http://localhost:5000/users", {
        userId,
        password,
      });
      if (response.status === 500) {
        console.error(response.data);
      }
      return response.data;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }
);

export const findUserById: any = createAsyncThunk(
  "user/userId",
  async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      if (response.status === 200) {
        console.log(response.data)
        return response.data;
      } else if (response.data === 404) {
        console.error("User not found");
        return response.data;
      }
      return response.data;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }
);

export default AuthSlicer.reducer;
