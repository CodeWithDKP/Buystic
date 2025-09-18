import profile from "../assets/profilepic.jpg";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css";

function Profile({ currentUser, cart, orders }) {
  const navigate = useNavigate();

  if (!currentUser)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="profile-card d-flex align-items-center">
        <img src={profile} alt="Profile" />
        <div>
          <h5>{currentUser.name}</h5>
          <p className="text">{currentUser.email || "No email"}</p>
        </div>
      </div>

      <div className="profile-card">
        <h5>Current Cart</h5>
        {cart.length === 0 ? (
          <p className="text">No items in cart.</p>
        ) : (
          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                <span>{item.title} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="profile-card">
        <h5>Previous Orders</h5>
        {orders.length === 0 ? (
          <p className="text">No past orders.</p>
        ) : (
          <ul>
            {orders.map((o) => (
              <li key={o.id}>
                <span>Order #{o.id} – ₹{o.total}</span>
                <span className={`badge ${o.status === "Delivered" ? "bg-success" : "bg-warning"}`}>
                  {o.status}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          className="btn btn-primary mt-3 w-100"
          onClick={() => navigate("/orders")}
        >
          View My Orders
        </button>
      </div>
    </div>
  );
}

export default Profile;
