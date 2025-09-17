// src/pages/Cart.jsx

import { useNavigate } from "react-router-dom";

function Cart({ isLoggedIn, cart, setCart, subtotal, taxes, shipping, discount, totalPrice }) {
  const navigate = useNavigate();

  const handleIncrease = (product) => {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist.quantity === 1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const handleRemove = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/Checkout");
    } else {
      navigate("/Login");
    }
  };

  return (
    <div className="cart-container">
      <h2>MyCart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">No items in cart</p>
      ) : (
        <div className="table-responsive">
          <table className="cart-table-cart table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.title} className="me-2" />
                    {item.title}
                  </td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <button
                        className="quantity-btn btn-decrease"
                        onClick={() => handleDecrease(item)}
                      >
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="quantity-btn btn-increase"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr />
          <div className="text-end">
            <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p>Taxes (10%): ₹{taxes.toFixed(2)}</p>
            <p>Shipping: ₹{shipping.toFixed(2)}</p>
            <p>Discount (5%): -₹{discount.toFixed(2)}</p>
            <hr />
            <h4 className="cart-total">Total: ₹{totalPrice.toFixed(2)}</h4>
          </div>

          <div className="text-end">
            <button className="btn-checkout" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
