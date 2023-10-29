import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../helper";

// initla state using asyncthunk
const userid = window.localStorage.getItem("userid");
export const fetchdata = createAsyncThunk("fetchdata", async () => {
  try {
    const response = await axios.get(`${baseurl}/${userid}`);
    if (response) {
      const serializablePayload = {
        data: response.data,
        headers: {
          'content-type': response.headers['content-type'],
        },
      };
      return serializablePayload;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
});

const initialState = {
  data: [],
  loading: "idle",
  error: null,
};
const CardSlice = createSlice({
  name: "Card",
  initialState,
  reducers: {
    Addlike: {},
    RemoveLike: {},
    AddSave: {},
    RemoveSave: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchdata.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchdata.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchdata.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { Addlike, RemoveLike, AddSave, RemoveSave } = CardSlice.actions;
export default CardSlice.reducer;
