import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUserData,
  updateUserData,
  addUserData,
  deleteUserData,
} from "./userAPI";
import { IUser, IUserResponse, UserState } from "../../types";
import { FailureToast, SuccessToast } from "../../utils/toast";

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
export const UpdateUser = createAsyncThunk(
  "users/updateUser",
  async (userData: Partial<IUser>) => {
    const response: IUser = await updateUserData(userData);
    return response;
  }
);
export const AddUser = createAsyncThunk(
  "users/addUser",
  async (userData: IUser) => {
    const response = await addUserData(userData);
    return response;
  }
);
export const DeleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    await deleteUserData(id);
    return { id };
  }
);
const initialState: UserState = {
  users: [],
  pending: false,
  error: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
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
        FailureToast("Failed to fetch users");
        state.error = action.error.message || "An unknown error occurred";
      })
      .addCase(UpdateUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.pending = false;
        const targetIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (targetIndex !== -1) {
          state.users.splice(targetIndex, 1, action.payload);
        }
        SuccessToast("User Updated Successfully");
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.pending = false;
        FailureToast("Failed to update user");
        state.error = action.error.message || "An unknown error occurred";
      })
      .addCase(AddUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(AddUser.fulfilled, (state, action) => {
        state.pending = false;
        state.users = [...state.users, action.payload];
        SuccessToast("User Successfully Added at the End");
      })
      .addCase(AddUser.rejected, (state, action) => {
        state.pending = false;
        FailureToast("Failed to add user");
        state.error = action.error.message || "An unknown error occurred";
      })
      .addCase(DeleteUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.pending = false;
        SuccessToast("User Deleted Successfully");
        state.users = state.users.filter(
          (user: { id: string }) => user.id != action.payload.id.toString()
        );
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.pending = false;
        FailureToast("Failed to delete user");
        state.error = action.error.message || "An unknown error occurred";
      });
  },
});

export default userSlice.reducer;
