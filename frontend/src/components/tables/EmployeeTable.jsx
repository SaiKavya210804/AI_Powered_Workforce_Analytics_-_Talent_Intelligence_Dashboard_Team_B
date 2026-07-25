function EmployeeTable({ employees }) {
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;