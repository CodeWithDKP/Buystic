import "../style/Checkout.css";
import { useState } from "react";

function Checkout({ cart, subtotal, taxes, shipping, discount, totalPrice, setCart, setOrders }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Full Name is required";
    if (!form.address) tempErrors.address = "Address is required";
    if (!form.city) tempErrors.city = "City is required";
    if (!form.zip) tempErrors.zip = "Zip code is required";
    if (!form.phone) tempErrors.phone = "Phone number is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      setSuccessMsg("");
      alert("Your cart is empty!");
      return;
    }

    if (!validateForm()) return;

    const newOrder = {
      id: "ORD" + Date.now(), // unique order ID
      date: new Date().toISOString().split("T")[0],
      total: totalPrice,
      items: [...cart],
      status: "Pending",
      shippingAddress: form,
      paymentMethod,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    setForm({ name: "", address: "", city: "", zip: "", phone: "" });
    setSuccessMsg(" Order placed successfully!");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <section>
        <h4>Shipping Address</h4>
        <form>
          {["name","address","city","zip","phone"].map((field) => (
            <div key={field} className="form-group">
              <input
                type={field === "phone" ? "tel" : "text"}
                name={field}
                placeholder={field === "name" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={handleChange}
              />
              {errors[field] && <small className="error-text">{errors[field]}</small>}
            </div>
          ))}
        </form>
      </section>

      <section>
        <h4>Payment Method</h4>
        <label>
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />{" "}
          Cash on Delivery
        </label>
        <label>
          <input type="radio" name="payment" disabled /> UPI / Card
          <span title="Available soon"> (Available soon)</span>
        </label>
      </section>

      <section>
        <h4>Order Summary</h4>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <span>{item.title} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
        <p>Taxes: ₹{taxes.toFixed(2)}</p>
        <p>Shipping: ₹{shipping.toFixed(2)}</p>
        <p>Discount: -₹{discount.toFixed(2)}</p>
        <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
      </section>

      <button className="btn btn-success w-100" onClick={handlePlaceOrder}>
        Place Order
      </button>

      {successMsg && <div className="toast-msg">{successMsg}</div>}
    </div>
  );
}

export default Checkout;
