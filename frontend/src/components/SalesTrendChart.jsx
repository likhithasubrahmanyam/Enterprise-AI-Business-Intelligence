import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function SalesTrendChart({ data }) {
  return (
    <div className="chart-card">

      <div className="chart-header">
        <h3>Sales Trend</h3>
        <p>Number of sales over time</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#0a6ed1"
            strokeWidth={2}
            dot={{ r: 3 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default SalesTrendChart;