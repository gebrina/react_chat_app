import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { TUser } from "../types/User";
import { AxiosError } from "axios";

const errorMsg = "Something went wrong.";

export const postUser = async (user: TUser): Promise<TUser[]> => {
  try {
    await axiosInstance.post("/users", user);
    toast.success("User saved successfully.");
    return await getUsers();
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.message);
    } else {
      toast.error(errorMsg);
    }
    return [];
  }
};

export const getUsers = async (): Promise<TUser[]> => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.message);
    } else {
      toast.error(errorMsg);
    }
    return [];
  }
};

export const updatedUser = async (user: TUser) => {
  try {
    await axiosInstance.put(`/users/${user.id}`, user);
    toast.success("User updated successfully.");
    return await getUsers();
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.message);
    } else {
      toast.error(errorMsg);
    }
  }
};

export const deleteUser = async (id: string) => {
  try {
    await axiosInstance.delete(`users/${id}`);
    toast.success("User deleted successfully.");
    return await getUsers();
  } catch (e) {
    if (e instanceof AxiosError) {
      toast.error(e.message);
    } else {
      toast.error(errorMsg);
    }
  }
};
