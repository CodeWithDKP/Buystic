
function ProductCard({ product, footerContent }) {
  return (
    <div className="product-card h-100 shadow-sm">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <p className="card-text">{product.price}</p>
        <div className="mt-auto">{footerContent}</div>
      </div>
    </div>
    
  );
}

export default ProductCard;
