import { useEffect, useState } from "react";
import { getDepartments } from "../../services/departmentService";

function Departments() {

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page-container">
      <h1>Departments</h1>

      {departments.map((dept) => (
        <div key={dept.department}>
          <h3>{dept.department}</h3>
          <p>Total Employees: {dept.employee_count}</p>
        </div>
      ))}
    </div>
  );
}

export default Departments;