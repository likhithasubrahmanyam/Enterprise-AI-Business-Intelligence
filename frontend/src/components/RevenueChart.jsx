import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function RevenueChart({ data }) {
  return (
    <div className="chart-card">

      <div className="chart-header">
        <h3>Revenue Trend</h3>
        <p>Monthly revenue</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0a6ed1"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default RevenueChart;