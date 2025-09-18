// src/App.jsx
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

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    const savedUser = localStorage.getItem("user");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
      if (savedUser) setUser(JSON.parse(savedUser));
    }
  }, []);

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
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products cart={cart} setCart={setCart} />} />

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
        <Route path="/orders" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Orders orders={orders} />
          </ProtectedRoute>
        } />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && user?.role === "user"}>
              <Profile cart={cart} currentUser={user} />
            </ProtectedRoute>
          }
        />



        <Route
          path="/orders"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && user?.role === "user"}>
              <Orders orders={orders} />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && user?.role === "admin"}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />

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
