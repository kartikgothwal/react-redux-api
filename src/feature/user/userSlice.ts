import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserData,
  updateUserData,
  addUserData,
  deleteUserData,
} from "./userAPI";

export const FetchUsers = createAsyncThunk("users/FetchUsers", async () => {
  const response = await fetchUserData();
   return response;
});
export const UpdateUser = createAsyncThunk("users/updateUser", async () => {
  const response = await updateUserData("asds");
  return response;
});
export const AddUser = createAsyncThunk("users/addUser", async () => {
  const response = await addUserData("dsfds");
  return response;
});
export const DeleteUser = createAsyncThunk("users/deleteUser", async () => {
  const response = await deleteUserData(1);
  return response;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pending: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchUsers.pending, (state) => {
        state.pending = true;
      })
      .addCase(FetchUsers.fulfilled, (state, action) => {
        state.pending = false;
        state.users = action.payload;
      })
      .addCase(FetchUsers.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      })
      .addCase(UpdateUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.pending = false;

        state.users = action.payload;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(AddUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(AddUser.fulfilled, (state, action) => {
        state.pending = false;

        state.users = action.payload;
      })
      .addCase(AddUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(DeleteUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.pending = false;

        state.users = action.payload;
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
