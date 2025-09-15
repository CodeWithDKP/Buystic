// src/api/api.jsx
import axios from "axios";

// 🟢 Base API (dummy products API)
const API_BASE = "https://fakestoreapi.com";

/**
 * Get all products
 */
export const getProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE}/products`);
    console.log(res.data);
    
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/products/${id}`);
    console.log(res.data);
    
    return res.data;
   
    
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

/**
 * (Future) Create order
 */
export const createOrder = async (orderData) => {
  try {
    // later replace with your backend POST API
    const res = await axios.post(`${API_BASE}/orders`, orderData);
    return res.data;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};
