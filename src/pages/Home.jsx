import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section d-flex flex-column justify-content-center align-items-center">
        <h1 className="hero-title">Welcome to Buystic</h1>
        <p className="hero-text">
          Shop your favorite products at the best prices. Add items to your cart and checkout easily after login.
        </p>
        <Link to="/products" className="btn-hero">
          Shop Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="features-section container mt-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>Wide Range</h5>
              <p>Find groceries, electronics, and more daily essentials.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>Fast Delivery</h5>
              <p>Get products delivered to your doorstep quickly.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="feature-card">
              <h5>Secure Payments</h5>
              <p>Safe and easy payment options for a smooth checkout.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
