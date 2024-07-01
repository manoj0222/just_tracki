import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import STATUS from "../../enum/Status";

interface VisitorsInfo {
  url_id: string;
  city: string;
  device: string;
  country: string;
  isLoading: STATUS | null;
  countusers: Number;
  data:Array<any>;
}

const initialState: VisitorsInfo = {
  url_id: "",
  city: "",
  device: "",
  country: "",
  isLoading: STATUS.IDLE,
  countusers: 0,
  data:[]
};

const VisitorSlice = createSlice({
  name: "visitors",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(saveVisitors.pending, (state) => {
        state.isLoading = STATUS.LOADING;
      })
      .addCase(saveVisitors.fulfilled, (state) => {
        state.isLoading = STATUS.SUCCESS;
      })
      .addCase(saveVisitors.rejected, (state) => {
        state.isLoading = STATUS.FAILURE;
      }).addCase(getallVisiterData.pending, (state) => {
        state.isLoading = STATUS.LOADING;
      })
      .addCase(getallVisiterData.fulfilled, (state,action:PayloadAction<Object>) => {
        state.isLoading = STATUS.SUCCESS;
        state.data =action.payload.data;
      })
      .addCase(getallVisiterData.rejected, (state) => {
        state.isLoading = STATUS.FAILURE;
      })
  },
});

export const saveVisitors: any = createAsyncThunk(
  "visitors/save",
  async (visiter: VisitorsInfo, { rejectWithValue }) => {
    try {
      const { device, url_id, city, country } = visiter;
      const response = await axios.post(
        "http://localhost:5000/visitedusers/user",
        {
          device,
          url_id,
          city,
          country,
        }
      );
      if (response.status === 201) {
        return response.data;
      }
      return rejectWithValue("Failed to Saved the vistors");
    } catch (error: any) {
      return rejectWithValue(`Error while fetching the url: ${error}`);
    }
  }
);

export const getallVisiterData: any = createAsyncThunk(
  "stats/vistieduser",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/visitedusers/${_id}`
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue("User not found");
    } catch (error:any) {
      return rejectWithValue(`Error fetching user: ${error.message}`);
    }
  }
);

export default VisitorSlice.reducer;
