function DepartmentStats({ departments = [] }) {
  const totalDepartments = departments.length;

  const totalEmployees = departments.reduce(
    (sum, dept) => sum + (dept.employee_count || 0),
    0
  );

  const largestDepartment =
    departments.length > 0
      ? departments.reduce((a, b) =>
          a.employee_count > b.employee_count ? a : b
        )
      : null;

  const smallestDepartment =
    departments.length > 0
      ? departments.reduce((a, b) =>
          a.employee_count < b.employee_count ? a : b
        )
      : null;

  const cards = [
    {
      title: "Total Departments",
      value: totalDepartments,
    },
    {
      title: "Total Employees",
      value: totalEmployees,
    },
    {
      title: "Largest Department",
      value: largestDepartment?.department || "-",
    },
    {
      title: "Smallest Department",
      value: smallestDepartment?.department || "-",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,.1)",
          }}
        >
          <h4
            style={{
              color: "#666",
              marginBottom: "10px",
            }}
          >
            {card.title}
          </h4>

          <h2
            style={{
              color: "#2563eb",
            }}
          >
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default DepartmentStats;