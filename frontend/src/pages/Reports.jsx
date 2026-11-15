import { useEffect, useState } from "react";

import {
  getDashboardSummary,
  getMonthlyRevenue,
  getTopProducts,
} from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Reports() {
  const [summary, setSummary] = useState(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        setLoading(true);
        setError("");

        const [
          summaryData,
          revenueData,
          productsData,
        ] = await Promise.all([
          getDashboardSummary(),
          getMonthlyRevenue(),
          getTopProducts(),
        ]);

        setSummary(summaryData);
        setMonthlyRevenue(revenueData);
        setTopProducts(productsData);
      } catch (err) {
        console.error(err);
        setError(
          err.message || "Unable to load reports."
        );
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="page-section">
        <div className="page-title">
          <h2>Reports</h2>
          <p>Business reports and analytics</p>
        </div>

        <div className="table-card">
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-section">

      {/* PAGE TITLE */}

      <div className="page-title">
        <h2>Reports</h2>
        <p>Business reports and analytics</p>
      </div>

      {/* ERROR */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* BUSINESS SUMMARY */}

      {summary && (
        <div className="table-card">

          <div className="table-header">
            <h3>Business Summary</h3>
          </div>

          <div className="stats-grid">

            <div className="report-stat">
              <span>Total Employees</span>
              <strong>
                {summary.total_employees}
              </strong>
            </div>

            <div className="report-stat">
              <span>Total Customers</span>
              <strong>
                {summary.total_customers}
              </strong>
            </div>

            <div className="report-stat">
              <span>Total Products</span>
              <strong>
                {summary.total_products}
              </strong>
            </div>

            <div className="report-stat">
              <span>Total Sales</span>
              <strong>
                {summary.total_sales}
              </strong>
            </div>

            <div className="report-stat">
              <span>Total Revenue</span>
              <strong>
                ₹
                {Number(
                  summary.total_revenue
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="report-stat">
              <span>Low Stock Products</span>
              <strong>
                {summary.low_stock_products}
              </strong>
            </div>

          </div>

        </div>
      )}

      {/* CHARTS */}

      <div className="analytics-grid">

        {/* REVENUE CHART */}

        <div className="table-card">

          <div className="table-header">
            <h3>Revenue Trend</h3>
            <p>Monthly revenue</p>
          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <LineChart data={monthlyRevenue}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString("en-IN")}`
                }
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#0a6ed1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>


        {/* TOP PRODUCTS */}

        <div className="table-card">

          <div className="table-header">
            <h3>Top Products</h3>
            <p>Revenue by product</p>
          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={topProducts}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="product_name"
                angle={-15}
                textAnchor="end"
                height={70}
              />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString("en-IN")}`
                }
              />

              <Legend />

              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#0a6ed1"
              />

            </BarChart>
          </ResponsiveContainer>

        </div>


        {/* PIE CHART */}

        <div className="table-card">

          <div className="table-header">
            <h3>Revenue Distribution</h3>
            <p>Revenue share by product</p>
          </div>

          {topProducts.length === 0 ? (
            <p>No product revenue data available.</p>
          ) : (

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>

                <Pie
                  data={topProducts}
                  dataKey="revenue"
                  nameKey="product_name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                >

                  {topProducts.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          [
                            "#0a6ed1",
                            "#4b8bc8",
                            "#7aa6d1",
                            "#9dbbd8",
                            "#c1d0df",
                          ][
                            index % 5
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(
                      value
                    ).toLocaleString("en-IN")}`
                  }
                />

                <Legend />

              </PieChart>
            </ResponsiveContainer>

          )}

        </div>


        {/* TOP PRODUCTS TABLE */}

        <div className="table-card">

          <div className="table-header">
            <h3>Product Performance</h3>
            <p>Top selling products</p>
          </div>

          <table>

            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>

            <tbody>

              {topProducts.length === 0 ? (

                <tr>
                  <td
                    colSpan="3"
                    className="empty-cell"
                  >
                    No product data available
                  </td>
                </tr>

              ) : (

                topProducts.map(
                  (product, index) => (
                    <tr key={index}>

                      <td>
                        {product.product_name}
                      </td>

                      <td>
                        {product.quantity_sold}
                      </td>

                      <td>
                        ₹
                        {Number(
                          product.revenue
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                    </tr>
                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;