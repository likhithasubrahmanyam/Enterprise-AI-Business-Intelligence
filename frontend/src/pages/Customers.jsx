import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
} from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    customer_code: "",
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    city: "",
    country: "",
  });

  async function loadCustomers() {
    try {
      setLoading(true);
      setError("");

      const data = await getCustomers();

      setCustomers(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load customers.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
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

      await createCustomer(formData);

      setSuccess("Customer added successfully.");

      setFormData({
        customer_code: "",
        company_name: "",
        contact_person: "",
        email: "",
        phone: "",
        city: "",
        country: "",
      });

      setShowForm(false);

      await loadCustomers();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to add customer.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-section">

      <div className="page-title page-title-row">
        <div>
          <h2>Customers</h2>
          <p>Manage customer information</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setSuccess("");
          }}
        >
          {showForm ? "Cancel" : "+ Add Customer"}
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
            <h3>Add New Customer</h3>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Customer Code</label>
                <input
                  type="text"
                  name="customer_code"
                  value={formData.customer_code}
                  onChange={handleChange}
                  placeholder="CUS001"
                  required
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Company name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  placeholder="Contact person"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="customer@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Bengaluru"
                  required
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="India"
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
                {saving ? "Saving..." : "Save Customer"}
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="table-card">

        <div className="table-header">
          <h3>Customer List</h3>
        </div>

        {loading ? (
          <p>Loading customers...</p>
        ) : customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (

          <table>

            <thead>
              <tr>
                <th>Code</th>
                <th>Company</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Country</th>
              </tr>
            </thead>

            <tbody>

              {customers.map((customer) => (
                <tr key={customer.id}>

                  <td>{customer.customer_code}</td>
                  <td>{customer.company_name}</td>
                  <td>{customer.contact_person}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.city}</td>
                  <td>{customer.country}</td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Customers;