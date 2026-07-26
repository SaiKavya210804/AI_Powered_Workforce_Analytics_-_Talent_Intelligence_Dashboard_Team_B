function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {
  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Department</th>
          <th>Job Role</th>
          <th>Monthly Income</th>
          <th>Attrition</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.EmpID}>
            <td>{emp.EmpID}</td>
            <td>{emp.Age}</td>
            <td>{emp.Gender}</td>
            <td>{emp.Department}</td>
            <td>{emp.JobRole}</td>
            <td>{emp.MonthlyIncome}</td>
            <td>{emp.Attrition}</td>

            <td>
              <button
                onClick={() => onEdit(emp)}
                style={{
                  marginRight: "10px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(emp.EmpID)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;