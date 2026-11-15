
import { useEffect, useState } from "react";
import {
  getSales,
  createSale,
} from "../services/api";

function Sales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    employee_id: "",
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  async function loadSales() {
    try {
      setLoading(true);
      setError("");

      const data = await getSales();
      setSales(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load sales.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSales();
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

      const saleData = {
        employee_id: Number(formData.employee_id),
        customer_id: Number(formData.customer_id),
        product_id: Number(formData.product_id),
        quantity: Number(formData.quantity),
      };

      await createSale(saleData);

      setSuccess("Sale created successfully.");

      setFormData({
        employee_id: "",
        customer_id: "",
        product_id: "",
        quantity: "",
      });

      setShowForm(false);
      await loadSales();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to create sale.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-section">
      <div className="page-title page-title-row">
        <div>
          <h2>Sales</h2>
          <p>Manage sales transactions</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setSuccess("");
          }}
        >
          {showForm ? "Cancel" : "+ Add Sale"}
        </button>
      </div>

      {success && (
        <div className="success-message">{success}</div>
      )}

      {error && (
        <div className="error-message">{error}</div>
      )}

      {showForm && (
        <div className="table-card employee-form-card">
          <div className="table-header">
            <h3>Create New Sale</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Employee ID</label>
                <input
                  type="number"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Customer ID</label>
                <input
                  type="number"
                  name="customer_id"
                  value={formData.customer_id}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="number"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
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
                {saving ? "Saving..." : "Save Sale"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-card">
        <div className="table-header">
          <h3>Sales List</h3>
        </div>

        {loading ? (
          <p>Loading sales...</p>
        ) : sales.length === 0 ? (
          <p>No sales found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Customer ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>
                    {sale.sale_date
                      ? new Date(sale.sale_date).toLocaleDateString("en-IN")
                      : "—"}
                  </td>
                  <td>{sale.customer_id}</td>
                  <td>{sale.product_id}</td>
                  <td>{sale.quantity}</td>
                  <td>
                    ₹{Number(sale.unit_price).toLocaleString("en-IN")}
                  </td>
                  <td>
                    ₹{Number(sale.total_amount).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Sales;
