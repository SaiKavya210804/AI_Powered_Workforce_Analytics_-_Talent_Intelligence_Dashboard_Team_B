function DepartmentTable({ departments }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        marginTop: "20px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#2563eb",
              color: "#fff",
            }}
          >
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Employee Count</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept, index) => (
            <tr
              key={index}
              style={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <td style={styles.td}>{dept.department}</td>

              <td style={styles.td}>
                {dept.employee_count}
              </td>

              <td style={styles.td}>
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    padding: "15px",
    textAlign: "left",
    fontSize: "16px",
  },

  td: {
    padding: "15px",
    fontSize: "15px",
  },
};

export default DepartmentTable;