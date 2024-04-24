import axios from "axios";

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:4000", // Replace with your server URL
});

// Define routes
const userRoutes = {
  login: "/user/login",
  updateProduct: "/user/updateProduct",
  addProduct: "/user/addProduct",
};

export interface IProduct {
  _id: string;
  productName: string;
  color: string;
  category: string;
  price: string;
}
export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  products?: IProduct[];
  addProductCount?: number;
  updateProductCount?: number;
}

export async function loginUser(email: string): Promise<IUser> {
  try {
    const response = await api.post(userRoutes.login, { email });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function postProduct(data: {
  email: string;
  productName: string;
  color: string;
  category: string;
  price: string;
}): Promise<IUser> {
  try {
    const response = await api.post(userRoutes.addProduct, data);
    return response.data;
  } catch (error) {
    console.error("Error adding product in:", error);
    throw error;
  }
}

export async function updateProduct(data: {
  email: string;
  productName: string;
  color: string;
  category: string;
  price: string;
  productId: string;
}): Promise<IUser> {
  try {
    const response = await api.put(userRoutes.updateProduct, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
