import { useEffect, useState } from "react";
import { getEmployees, createEmployee } from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    joining_date: "",
  });

  // Load employees
  async function loadEmployees() {
    try {
      setLoading(true);
      setError("");

      const data = await getEmployees();

      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load employees.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  // Handle form changes
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Submit employee
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const employeeData = {
        employee_id: formData.employee_id,
        full_name: formData.full_name,
        email: formData.email,
        department: formData.department,
        designation: formData.designation,
        salary: Number(formData.salary),
        joining_date: formData.joining_date,
      };

      await createEmployee(employeeData);

      setSuccess("Employee added successfully.");

      setFormData({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
        designation: "",
        salary: "",
        joining_date: "",
      });

      setShowForm(false);

      await loadEmployees();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to add employee.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-section">

      {/* Page Header */}

      <div className="page-title page-title-row">

        <div>
          <h2>Employees</h2>
          <p>Manage employee information</p>
        </div>

        <button
          className="primary-button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setSuccess("");
          }}
        >
          {showForm ? "Cancel" : "+ Add Employee"}
        </button>

      </div>


      {/* Success Message */}

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}


      {/* Error Message */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {/* Add Employee Form */}

      {showForm && (
        <div className="table-card employee-form-card">

          <div className="table-header">
            <h3>Add New Employee</h3>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* Employee ID */}

              <div className="form-group">
                <label>Employee ID</label>

                <input
                  type="text"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleChange}
                  placeholder="EMP001"
                  required
                />
              </div>


              {/* Full Name */}

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>


              {/* Email */}

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="employee@example.com"
                  required
                />
              </div>


              {/* Department */}

              <div className="form-group">
                <label>Department</label>

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Sales"
                  required
                />
              </div>


              {/* Designation */}

              <div className="form-group">
                <label>Designation</label>

                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Sales Executive"
                  required
                />
              </div>


              {/* Salary */}

              <div className="form-group">
                <label>Salary</label>

                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="50000"
                  min="0"
                  required
                />
              </div>


              {/* Joining Date */}

              <div className="form-group">
                <label>Joining Date</label>

                <input
                  type="date"
                  name="joining_date"
                  value={formData.joining_date}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>


            {/* Submit */}

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
                {saving ? "Saving..." : "Save Employee"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* Employee Table */}

      <div className="table-card">

        <div className="table-header">
          <h3>Employee List</h3>
        </div>

        {loading ? (
          <p>Loading employees...</p>
        ) : employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {employees.map((employee) => (
                <tr key={employee.id}>

                  <td>{employee.id}</td>

                  <td>{employee.employee_id}</td>

                  <td>{employee.full_name}</td>

                  <td>{employee.email}</td>

                  <td>{employee.department}</td>

                  <td>{employee.designation}</td>

                  <td>
                    ₹
                    {Number(employee.salary).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>{employee.joining_date}</td>

                  <td>
                    <span className="status-active">
                      {employee.status}
                    </span>
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

export default Employees;