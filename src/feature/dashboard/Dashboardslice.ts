import URLInfo from "../../interfaces/URLInfo";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import STATUS from "../../enum/Status";
import { RootState } from "../../store/store";

interface DashBoard {
  createdLinks: Array<URLInfo>;
  newurl: URLInfo | null;
  filteredLinks: Array<URLInfo>;
  isLoading: STATUS;
  originalurl: string;
  countvisiters: number;
}

const initialState: DashBoard = {
  createdLinks: [],
  newurl: null,
  filteredLinks: [],
  isLoading: STATUS.IDLE,
  originalurl: "",
  countvisiters: 0,
};

const DashBoardSlice = createSlice({
  name: "dashboardslice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllCreatedLinksByUserId.pending, (state) => {
        state.isLoading = STATUS.LOADING;
      })
      .addCase(getAllCreatedLinksByUserId.fulfilled, (state, action) => {
        state.isLoading = STATUS.SUCCESS;
        console.log(action.payload.data);
        state.createdLinks = action.payload.data;
      })
      .addCase(getAllCreatedLinksByUserId.rejected, (state) => {
        state.isLoading = STATUS.FAILURE;
      })
      .addCase(getUrlsByUserIdAndCustomUrl.pending, (state) => {
        state.isLoading = STATUS.LOADING;
      })
      .addCase(getUrlsByUserIdAndCustomUrl.fulfilled, (state, action) => {
        state.isLoading = STATUS.SUCCESS;
        state.originalurl = action.payload.data.originalurl;
      })
      .addCase(getUrlsByUserIdAndCustomUrl.rejected, (state) => {
        state.isLoading = STATUS.FAILURE;
      })
      .addCase(deleteById.pending, (state) => {
        state.isLoading = STATUS.LOADING;
      })
      .addCase(deleteById.fulfilled, (state, action) => {
        state.isLoading = STATUS.SUCCESS;
      })
      .addCase(deleteById.rejected, (state) => {
        state.isLoading = STATUS.FAILURE;
      })
      .addCase(countVistors.pending, (state) => {
        state.isLoading = STATUS.LOADING;
      })
      .addCase(
        countVistors.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.isLoading = STATUS.SUCCESS;
          state.countvisiters = action.payload;
        }
      )
      .addCase(countVistors.rejected, (state) => {
        state.isLoading = STATUS.FAILURE;
      });
  },
});

export const getAllCreatedLinksByUserId: any = createAsyncThunk(
  "type/dashboard/geturls",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const user_id = state.authentication.userId;
      const response = await axios.get(
        `http://localhost:5000/dashboard/urls/user/${user_id}`
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue("User not found");
    } catch (error: any) {
      return rejectWithValue(`Error fetching user: ${error.message}`);
    }
  }
);

export const createLink: any = createAsyncThunk(
  "type/dashboard/geturls",
  async (urlInfo: URLInfo, { getState, rejectWithValue }) => {
    const { title, originalurl, custom_url, qrcode } = urlInfo;
    try {
      const state = getState() as RootState;
      const user_id = state.authentication.userId;

      const response = await axios.post(
        `http://localhost:5000/dashboard/urls`,
        {
          user_id,
          title,
          originalurl,
          custom_url,
          qrcode,
        }
      );

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue("Failed to create URL");
    } catch (error: any) {
      return rejectWithValue(`Error creating URL: ${error}`);
    }
  }
);

export const deleteById: any = createAsyncThunk(
  "dashboard/url/deletebyid",
  async (_id: string, { rejectWithValue, getState }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/dashboard/urls/${_id}`
      );
      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue("Failed to create URL");
    } catch (error: any) {
      return rejectWithValue(`Error creating URL: ${error}`);
    }
  }
);

export const getUrlsByUserIdAndCustomUrl: any = createAsyncThunk(
  "dashboard/redirection",
  async (custom_url: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const user_id = state.authentication.userId;

      const response = await axios.get(
        `http://localhost:5000/dashboard/urls/user/${user_id}/custom/${custom_url}`
      );

      if (response.status === 200) {
        return response.data;
      }
      return rejectWithValue("Failed to fecth the URL");
    } catch (error: any) {
      return rejectWithValue(`Error while fetching the url: ${error}`);
    }
  }
);

export const countVistors: any = createAsyncThunk(
  "visitors/count",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/visitedusers/count"
      ); // Replace with your actual endpoint
      console.log("Count of visited users:", response.data.count);
      return response.data.count; // Return the count or use it as needed
    } catch (error) {
      console.error("Error fetching count of visited users:", error);
      return rejectWithValue("Error fetching count of visited users:"); // Handle error gracefully, e.g., show an error message
    }
  }
);

export default DashBoardSlice.reducer;
