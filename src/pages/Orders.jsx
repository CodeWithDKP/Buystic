// src/pages/Orders.jsx
import { useState } from "react";
import "../style/Orders.css";

function Orders({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="cart-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="cart-empty">No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="cart-table mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Order #{order.id}</h5>
                <span
                  className={`badge ${
                    order.status === "Delivered" ? "badge-success" : "badge-warning"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="mb-2">Date: {order.date}</p>
              <h6 className="cart-total text-end">Total: ₹{order.total}</h6>

              <button
                className="btn btn-checkout mt-2"
                onClick={() => setSelectedOrder(order)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-details-modal">
          <div className="order-details-card">
            <h4>Order #{selectedOrder.id}</h4>
            <p>Date: {selectedOrder.date}</p>
            <p>Status: {selectedOrder.status}</p>

            <h5>Items:</h5>
            <ul>
              {selectedOrder.items.map((item, i) => (
                <li key={i}>
                  {item.title} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>

            <h5>Shipping Address:</h5>
            <p>{selectedOrder.shippingAddress.name}</p>
            <p>{selectedOrder.shippingAddress.address}</p>
            <p>{selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.zip}</p>
            <p>{selectedOrder.shippingAddress.phone}</p>

            <h5>Total: ₹{selectedOrder.total}</h5>

            <button className="btn btn-secondary mt-3" onClick={() => setSelectedOrder(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
