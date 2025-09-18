import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import { getProducts } from "./service/api";   // ✅ import API

function App() {
  const savedLogin = localStorage.getItem("isLoggedIn") === "true";
  const savedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const savedOrders = localStorage.getItem("orders")
    ? JSON.parse(localStorage.getItem("orders"))
    : [];

  const [isLoggedIn, setIsLoggedIn] = useState(savedLogin);
  const [user, setUser] = useState(savedUser);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(savedOrders);
  const [products, setProducts] = useState([]); // ✅ global products
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products once
  useEffect(() => {
    async function fetchAllProducts() {
      const all = await getProducts();
      const removed = JSON.parse(localStorage.getItem("removedProducts")) || [];
      const finalProducts = all.filter((p) => !removed.some((r) => r.id === p.id));
      setProducts(finalProducts);
      setLoading(false);
    }
    fetchAllProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.1;
  const taxes = subtotal * taxRate;
  const shipping = subtotal > 1000 ? 0 : 50;
  const discountRate = 0.05;
  const discount = subtotal * discountRate;
  const totalPrice = subtotal + taxes + shipping - discount;

  return (
    <Router>
      <Navbar cartCount={cart.length} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />

      <Routes>
        {/* ✅ pass products to Home */}
        <Route path="/" element={<Home products={products} loading={loading} />} />

        {/* ✅ also pass products to Products */}
        <Route path="/products" element={<Products products={products} cart={cart} setCart={setCart} />} />

        <Route
          path="/cart"
          element={
            <Cart
              isLoggedIn={isLoggedIn}
              cart={cart}
              setCart={setCart}
              subtotal={subtotal}
              taxes={taxes}
              shipping={shipping}
              discount={discount}
              totalPrice={totalPrice}
            />
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} user={user} allowedRoles={["user"]}>
              <Orders orders={orders} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} user={user} allowedRoles={["user"]}>
              <Profile cart={cart} currentUser={user} orders={orders} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} user={user} allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              subtotal={subtotal}
              taxes={taxes}
              shipping={shipping}
              discount={discount}
              totalPrice={totalPrice}
              setCart={setCart}
              setOrders={setOrders}
              orders={orders}
            />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
