import { Link } from "react-router-dom";

function Home({ products }) {
  const collaborations = ["Amazon", "Flipkart", "Myntra", "Meesho", "Ajio", "Croma"];

  // Pick 15 products (adjust logic later if needed)
  const mostSold = products.slice(0, 15);
  const trending = products.slice(-15);

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

      {/* Most Sold Products */}
      <section className="scroll-section">
        <h2 className="section-title">Most Sold Products</h2>
        <div className="scroll-wrapper">
          <div className="scroll-content">
            {/* First set */}
            {mostSold.map((product) => (
              <div className="scroll-card" key={product.id}>
                <img src={product.image} alt={product.title} className="product-img" />
                <h6>{product.title.substring(0, 30)}...</h6>
                <p>₹{product.price}</p>
              </div>
            ))}
            {/* Duplicate set for infinite scroll */}
            {mostSold.map((product, i) => (
              <div className="scroll-card" key={`dup-sold-${i}`}>
                <img src={product.image} alt={product.title} className="product-img" />
                <h6>{product.title.substring(0, 30)}...</h6>
                <p>₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="scroll-section">
        <h2 className="section-title">Trending Products</h2>
        <div className="scroll-wrapper">
          <div className="scroll-content reverse">
            {/* First set */}
            {trending.map((product) => (
              <div className="scroll-card" key={product.id}>
                <img src={product.image} alt={product.title} className="product-img" />
                <h6>{product.title.substring(0, 30)}...</h6>
                <p>₹{product.price}</p>
              </div>
            ))}
            {/* Duplicate set for infinite scroll */}
            {trending.map((product, i) => (
              <div className="scroll-card" key={`dup-trend-${i}`}>
                <img src={product.image} alt={product.title} className="product-img" />
                <h6>{product.title.substring(0, 30)}...</h6>
                <p>₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="collab-section">
        <h2 className="section-title">Our Collaborations</h2>
        <div className="collab-wrapper">
          <div className="collab-content">
            {/* First set */}
            {collaborations.map((brand, i) => (
              <span key={i} className="collab-name">{brand}</span>
            ))}
            {/* Duplicate set */}
            {collaborations.map((brand, i) => (
              <span key={`dup-collab-${i}`} className="collab-name">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
