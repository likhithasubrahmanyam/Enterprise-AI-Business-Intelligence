import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
} from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    product_code: "",
    product_name: "",
    category: "",
    description: "",
    price: "",
    stock_quantity: "",
    reorder_level: "",
    supplier: "",
  });

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const productData = {
        product_code: formData.product_code,
        product_name: formData.product_name,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        stock_quantity: Number(formData.stock_quantity),
        reorder_level: Number(formData.reorder_level),
        supplier: formData.supplier,
      };

      await createProduct(productData);

      setSuccess("Product added successfully.");

      setFormData({
        product_code: "",
        product_name: "",
        category: "",
        description: "",
        price: "",
        stock_quantity: "",
        reorder_level: "",
        supplier: "",
      });

      setShowForm(false);

      await loadProducts();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to add product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-section">

      <div className="page-title page-title-row">
        <div>
          <h2>Products</h2>
          <p>Manage product information</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setSuccess("");
          }}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <div className="table-card employee-form-card">

          <div className="table-header">
            <h3>Add New Product</h3>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Product Code</label>
                <input
                  type="text"
                  name="product_code"
                  value={formData.product_code}
                  onChange={handleChange}
                  placeholder="PRD001"
                  required
                />
              </div>

              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  placeholder="Dell Laptop"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Electronics"
                  required
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="50000"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  name="stock_quantity"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  placeholder="100"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Reorder Level</label>
                <input
                  type="number"
                  name="reorder_level"
                  value={formData.reorder_level}
                  onChange={handleChange}
                  placeholder="10"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  placeholder="Supplier name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Product description"
                  required
                />
              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Product"}
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="table-card">

        <div className="table-header">
          <h3>Product List</h3>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (

          <table>

            <thead>
              <tr>
                <th>Code</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Reorder Level</th>
                <th>Supplier</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr key={product.id}>

                  <td>{product.product_code}</td>
                  <td>{product.product_name}</td>
                  <td>{product.category}</td>

                  <td>
                    ₹
                    {Number(product.price).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>{product.stock_quantity}</td>
                  <td>{product.reorder_level}</td>
                  <td>{product.supplier}</td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Products;