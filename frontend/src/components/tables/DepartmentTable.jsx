function DepartmentTable({ departments }) {
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
          <th>Department</th>
          <th>Employees</th>
        </tr>
      </thead>

      <tbody>
        {departments.map((dept) => (
          <tr key={dept.department}>
            <td>{dept.department}</td>
            <td>{dept.employee_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DepartmentTable;