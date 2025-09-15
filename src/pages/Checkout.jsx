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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const { name, address, city, zip, phone } = form;
    if (!name || !address || !city || !zip || !phone) {
      alert("Please fill all shipping details before placing the order!");
      return;
    }
    const newOrder = {
      id: "ORD" + Math.floor(Math.random() * 100000),
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      total: totalPrice,
      items: [...cart],
      status: "Pending",
      shippingAddress: form,
    };
    setOrders((prev) => [...prev, newOrder]);
    setCart([]);

    alert("✅ Order placed successfully!");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <section>
        <h4>Shipping Address</h4>
        <form>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} />
          <input type="text" name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
        </form>
      </section>

      <section>
        <h4>Payment Method</h4>
        <label>
          <input type="radio" name="payment" defaultChecked /> Cash on Delivery
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
              {item.title} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
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
    </div>
  );
}

export default Checkout;
