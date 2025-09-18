
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // 🔹 track selected product

  const navigate = useNavigate();

  useEffect(() => {
    const approved = JSON.parse(localStorage.getItem("approvedProducts")) || [];
    setProducts(approved);
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cart handlers
  const handleAdd = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (!exist) setCart([...cart, { ...product, quantity: 1 }]);
  };
  const handleIncrease = (product) =>
    setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
  const handleDecrease = (product) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist.quantity === 1) setCart(cart.filter((item) => item.id !== product.id));
    else setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item));
  };

  // 🔹 Render single product details
  if (selectedProduct) {
    const inCart = cart.find((item) => item.id === selectedProduct.id);
    return (
      <div className="product-details-container">
        <button className="btn-back mb-3" onClick={() => setSelectedProduct(null)}>
          Back
        </button>
        <div className="product-details-card">
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <h2>{selectedProduct.title}</h2>
          <p>Category: {selectedProduct.category}</p>
          <p>{selectedProduct.description}</p>
          <p>₹{selectedProduct.price}</p>
          {!inCart ? (
            <button className="btn" onClick={() => handleAdd(selectedProduct)}>Add</button>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-danger" onClick={() => handleDecrease(selectedProduct)}>–</button>
              <span>{inCart.quantity} in cart</span>
              <button className="btn btn-success" onClick={() => handleIncrease(selectedProduct)}>+</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 🔹 Render products list
  return (
    <div className="products-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control mb-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2>Products</h2>
      <div className="products-row">

        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h5>{product.title}</h5>
            <p>₹{product.price}</p>
            <div className="product-footer">
              <button className="btn" onClick={() => setSelectedProduct(product)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={`sticky-cart ${cart.length > 0 ? "show" : "hide"}`}>
        {cart.reduce((total, item) => total + item.quantity, 0)} items
        <button className="btn-checkout ms-3" onClick={() => navigate("/cart")}>View Cart</button>
      </div>
    </div>
  );
}

export default Products;
