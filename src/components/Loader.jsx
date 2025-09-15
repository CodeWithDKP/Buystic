// src/components/Loader.jsx
import "../style/Loader.css";

function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner-border loader-spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
