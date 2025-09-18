// src/pages/Admin.jsx

import { useState, useEffect } from "react";
import { getProducts } from "../service/api";
import '../style/Loader.css';

function Admin() {
  const [allProducts, setAllProducts] = useState([]);
  const [approved, setApproved] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState("");

 
 useEffect(() => {
  getProducts().then((data) => {
    setAllProducts(data);


    let stored = JSON.parse(localStorage.getItem("approvedProducts"));

    
    if (!stored || stored.length === 0) {
      localStorage.setItem("approvedProducts", JSON.stringify(data));
      stored = data;
    }

    setApproved(stored);
  });
}, []);



  // Approve / Remove product
  const handleToggle = (product) => {
    let updated;
    if (approved.find((p) => p.id === product.id)) {
      updated = approved.filter((p) => p.id !== product.id);
    } else {
      updated = [...approved, product];
    }
    setApproved(updated);
    localStorage.setItem("approvedProducts", JSON.stringify(updated));
  };

  // Delete product from list (local only for now)
  const handleDelete = (id) => {
    const updated = allProducts.filter((p) => p.id !== id);
    setAllProducts(updated);
  };

  // Start editing
  const handleEdit = (id, price) => {
    setEditingId(id);
    setNewPrice(price);
  };

  // Save edited price
  const handleSave = (id) => {
    const updated = allProducts.map((p) =>
      p.id === id ? { ...p, price: parseFloat(newPrice) } : p
    );
    setAllProducts(updated);

    // also update approved list if product exists there
    const updatedApproved = approved.map((p) =>
      p.id === id ? { ...p, price: parseFloat(newPrice) } : p
    );
    setApproved(updatedApproved);
    localStorage.setItem("approvedProducts", JSON.stringify(updatedApproved));

    setEditingId(null);
    setNewPrice("");
  };

  return (
    <div className="admin-container">
      <h2 className="mb-4">Admin Panel</h2>
      <p className="text-muted">Manage products below</p>

      <div className="table-responsive">
        <table className="table admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => {
              const isApproved = approved.find((p) => p.id === product.id);
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title.slice(0, 40)}...</td>
                  <td>
                    {editingId === product.id ? (
                      <input
                        type="number"
                        className="form-control"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        style={{ maxWidth: "120px" }}
                      />
                    ) : (
                      `₹${product.price}`
                    )}
                  </td>
                  <td>
                    {editingId === product.id ? (
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleSave(product.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(product.id, product.price)}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      className={`btn btn-sm me-2 ${isApproved ? "btn-danger" : "btn-success"
                        }`}
                      onClick={() => handleToggle(product)}
                    >
                      {isApproved ? "Remove" : "Approve"}
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
