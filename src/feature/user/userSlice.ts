import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserData,
  updateUserData,
  addUserData,
  deleteUserData,
} from "./userAPI";
import { IUser, IUserResponse } from "../../types";

export const FetchUsers = createAsyncThunk("users/FetchUsers", async () => {
  const response = await fetchUserData();
  return response.map((users: IUserResponse): IUser => {
    return {
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone.split(" ")[0],
      city: users.address.city,
      zipcode: users.address.zipcode,
    };
  });
});
export const UpdateUser = createAsyncThunk("users/updateUser", async () => {
  const response: IUserResponse[] = await updateUserData("asds");
  return response.map((users: IUserResponse): IUser => {
    return {
      id: users.id,
      name: users.name,
      email: users.email,
      phone: users.phone,
      city: users.address.city,
      zipcode: users.address.zipcode,
    };
  });
});
export const AddUser = createAsyncThunk("users/addUser", async () => {
  const response = await addUserData("dsfds");
  return response;
});
export const DeleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    const response = await deleteUserData(id);
    return { id };
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    pending: false,
    error: "",
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
        state.pending = false;
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
        state.pending = false;
        state.error = action.error.message;
      })
      .addCase(DeleteUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.pending = false;
        state.users = state.users.filter(
          (user: { id: number }) => user.id != action.payload.id
        );
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
