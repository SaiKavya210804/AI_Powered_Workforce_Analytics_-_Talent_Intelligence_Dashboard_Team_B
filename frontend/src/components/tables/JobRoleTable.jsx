function JobRoleTable({ jobRoles }) {
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
          <th>Job Role</th>
          <th>Employees</th>
        </tr>
      </thead>

      <tbody>
        {jobRoles.map((role) => (
          <tr key={role.job_role}>
            <td>{role.job_role}</td>
            <td>{role.employee_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JobRoleTable;