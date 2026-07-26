import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#2563eb", // Healthcare Representative - Blue
  "#10b981", // Human Resources - Emerald Green
  "#f59e0b", // Laboratory Technician - Amber
  "#ef4444", // Manager - Red
  "#8b5cf6", // Manufacturing Director - Violet
  "#06b6d4", // Research Director - Cyan
  "#84cc16", // Research Scientist - Lime
  "#ec4899", // Sales Executive - Pink
  "#f97316", // Sales Representative - Orange
];

function JobRolePieChart({ jobRoles }) {
  return (
    <div
      style={{
    width: "100%",
    height: 450,
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "20px",
    }}
  >
    Employee Distribution by Job Role
  </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={jobRoles}
            dataKey="employee_count"
            nameKey="job_role"
            outerRadius={130}
            label
          >
            {jobRoles.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default JobRolePieChart;