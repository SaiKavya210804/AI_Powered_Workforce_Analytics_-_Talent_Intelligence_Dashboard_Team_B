import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        fontSize: "14px",
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: "#f3f4f6",
          }}
        >
          <th style={styles.th}>Employee ID</th>
          <th style={styles.th}>Age</th>
          <th style={styles.th}>Gender</th>
          <th style={styles.th}>Department</th>
          <th style={styles.th}>Job Role</th>
          <th style={styles.th}>Monthly Income</th>
          <th style={styles.th}>Attrition</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr
            key={emp.EmpID}
            style={{
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <td style={styles.td}>{emp.EmpID}</td>
            <td style={styles.td}>{emp.Age}</td>
            <td style={styles.td}>{emp.Gender}</td>
            <td style={styles.td}>{emp.Department}</td>
            <td style={styles.td}>{emp.JobRole}</td>
            <td style={styles.td}>
              ₹{emp.MonthlyIncome.toLocaleString()}
            </td>
            <td style={styles.td}>{emp.Attrition}</td>

            <td
              style={{
                ...styles.td,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Tooltip title="Edit Employee">
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => onEdit(emp)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Employee">
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDelete(emp.EmpID)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles = {
  th: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #d1d5db",
    fontWeight: "600",
  },

  td: {
    padding: "10px 12px",
    textAlign: "left",
  },
};

export default EmployeeTable;