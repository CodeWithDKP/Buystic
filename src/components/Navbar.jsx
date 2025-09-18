// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../App.css";

function Navbar({ cartCount, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const navRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
    closeNavbar();
  };

  const closeNavbar = () => {
    if (navRef.current?.classList.contains("show")) {
      const bsCollapse =
        window.bootstrap.Collapse.getInstance(navRef.current) ||
        new window.bootstrap.Collapse(navRef.current, { toggle: false });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar-glass navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          Buystic
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav" ref={navRef}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={closeNavbar}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart" onClick={closeNavbar}>
                MyCart{" "}
                {cartCount > 0 && <span className="badge-cart">{cartCount}</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders" onClick={closeNavbar}>
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin" onClick={closeNavbar}>
                Admin
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile" onClick={closeNavbar}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn-login" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn-login" to="/login" onClick={closeNavbar}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
