import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

function DepartmentPieChart({ departments }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,.1)",
      }}
    >
      <h2>Department Distribution</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={departments}
            dataKey="employee_count"
            nameKey="department"
            outerRadius={120}
            label
          >
            {departments.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DepartmentPieChart;