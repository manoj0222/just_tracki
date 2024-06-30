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
}

const initialState: VisitorsInfo = {
  url_id: "",
  city: "",
  device: "",
  country: "",
  isLoading: STATUS.IDLE,
  countusers: 0,
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
      });
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

export default VisitorSlice.reducer;
