// src/App.jsx
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
        <Route path="/Products" element={<Products cart={cart} setCart={setCart} />} />

        <Route
          path="/Cart"
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
        <Route path="/Orders" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Orders orders={orders} />
          </ProtectedRoute>
        } />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && user?.role === "user"}>
              <Profile cart={cart} currentUser={user} />
            </ProtectedRoute>
          }
        />



        <Route
          path="/Orders"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && user?.role === "user"}>
              <Orders orders={orders} />
            </ProtectedRoute>
          }
        />


        <Route
          path="/Admin"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn && user?.role === "admin"}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />

        <Route
          path="/Checkout"
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
