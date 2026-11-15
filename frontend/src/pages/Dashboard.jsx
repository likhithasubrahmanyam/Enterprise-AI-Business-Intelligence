import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import SalesTrendChart from "../components/SalesTrendChart";

import {
  getDashboardSummary,
  getMonthlyRevenue,
  getSalesTrend,
  getTopProducts,
  getTopCustomers,
  getTopEmployees,
  getLowStockProducts,
} from "../services/api";

function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [salesTrend, setSalesTrend] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    async function loadDashboard() {

      try {

        const results = await Promise.all([
          getDashboardSummary(),
          getMonthlyRevenue(),
          getSalesTrend(),
          getTopProducts(),
          getTopCustomers(),
          getTopEmployees(),
          getLowStockProducts(),
        ]);

        setSummary(results[0]);
        setMonthlyRevenue(results[1]);
        setSalesTrend(results[2]);
        setTopProducts(results[3]);
        setTopCustomers(results[4]);
        setTopEmployees(results[5]);
        setLowStock(results[6]);

      } catch (error) {

        console.error(error);

        setError("Unable to load dashboard data.");

      } finally {

        setLoading(false);

      }
    }

    loadDashboard();

  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <div className="dashboard-heading">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of your business operations</p>
        </div>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Employees"
          value={summary.total_employees}
        />

        <StatCard
          title="Total Customers"
          value={summary.total_customers}
        />

        <StatCard
          title="Total Products"
          value={summary.total_products}
        />

        <StatCard
          title="Total Sales"
          value={summary.total_sales}
        />

        <StatCard
          title="Total Revenue"
          value={`₹${Number(
            summary.total_revenue
          ).toLocaleString("en-IN")}`}
        />

        <StatCard
          title="Low Stock Products"
          value={summary.low_stock_products}
        />

      </div>

      <div className="chart-grid">

        <RevenueChart data={monthlyRevenue} />

        <SalesTrendChart data={salesTrend} />

      </div>

      <div className="analytics-grid">

        <div className="table-card">

          <div className="table-header">
            <h3>Top Products</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Revenue</th>
              </tr>
            </thead>

            <tbody>

              {topProducts.slice(0, 5).map((item, index) => (
                <tr key={index}>
                  <td>{item.product_name}</td>
                  <td>{item.quantity_sold}</td>
                  <td>
                    ₹{Number(item.revenue).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}

            </tbody>
          </table>

        </div>


        <div className="table-card">

          <div className="table-header">
            <h3>Top Customers</h3>
          </div>

          <table>

            <thead>
              <tr>
                <th>Customer</th>
                <th>Orders</th>
                <th>Revenue</th>
              </tr>
            </thead>

            <tbody>

              {topCustomers.slice(0, 5).map((item, index) => (
                <tr key={index}>
                  <td>{item.company_name}</td>
                  <td>{item.total_orders}</td>
                  <td>
                    ₹{Number(item.revenue).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>


      <div className="analytics-grid">

        <div className="table-card">

          <div className="table-header">
            <h3>Top Employees</h3>
          </div>

          <table>

            <thead>
              <tr>
                <th>Employee</th>
                <th>Sales</th>
                <th>Revenue</th>
              </tr>
            </thead>

            <tbody>

              {topEmployees.slice(0, 5).map((item, index) => (
                <tr key={index}>
                  <td>{item.employee_name}</td>
                  <td>{item.sales_count}</td>
                  <td>
                    ₹{Number(item.revenue).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>


        <div className="table-card">

          <div className="table-header">
            <h3>Low Stock Products</h3>
          </div>

          <table>

            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Reorder Level</th>
              </tr>
            </thead>

            <tbody>

              {lowStock.length === 0 ? (

                <tr>
                  <td colSpan="3" className="empty-cell">
                    No low-stock products
                  </td>
                </tr>

              ) : (

                lowStock.slice(0, 5).map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.stock_quantity}</td>
                    <td>{item.reorder_level}</td>
                  </tr>
                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;