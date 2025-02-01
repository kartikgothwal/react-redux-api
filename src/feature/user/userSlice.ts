import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserData,
  updateUserData,
  addUserData,
  deleteUserData,
} from "./userAPI";

export const FetchUsers = createAsyncThunk("users/FetchUsers", async () => {
  const response = await fetchUserData();
  return response.data;
});
export const UpdateUser = createAsyncThunk("users/updateUser", async () => {
  const response = await updateUserData("asds");
  return response.data;
});
export const AddUser = createAsyncThunk("users/addUser", async () => {
  const response = await addUserData("dsfds");
  return response.data;
});
export const DeleteUser = createAsyncThunk("users/deleteUser", async () => {
  const response = await deleteUserData(1);
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(FetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(UpdateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(AddUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(AddUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DeleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
