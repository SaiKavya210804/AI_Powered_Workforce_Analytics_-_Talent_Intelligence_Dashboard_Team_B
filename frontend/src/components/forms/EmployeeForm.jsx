import { useState, useEffect } from "react";

function EmployeeForm({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const emptyEmployee = {
    EmpID: "",
    Age: "",
    Gender: "",
    Department: "",
    JobRole: "",
    Education: "",
    EducationField: "",
    MaritalStatus: "",
    MonthlyIncome: "",
    JobLevel: "",
    YearsAtCompany: "",
    TrainingTimesLastYear: "",
    EnvironmentSatisfaction: "",
    JobSatisfaction: "",
    RelationshipSatisfaction: "",
    WorkLifeBalance: "",
    YearsWithCurrManager: "",
    Attrition: "",
  };

  const [employee, setEmployee] = useState(emptyEmployee);

  useEffect(() => {
    if (initialData) {
      setEmployee(initialData);
    } else {
      setEmployee(emptyEmployee);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "700px",
          background: "#fff",
          borderRadius: "10px",
          padding: "25px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {initialData ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "15px",
            }}
          >
            <input
              name="EmpID"
              placeholder="Employee ID"
              value={employee.EmpID}
              onChange={handleChange}
            />

            <input
              name="Age"
              placeholder="Age"
              type="number"
              value={employee.Age}
              onChange={handleChange}
            />

            <input
              name="Gender"
              placeholder="Gender"
              value={employee.Gender}
              onChange={handleChange}
            />

            <input
              name="Department"
              placeholder="Department"
              value={employee.Department}
              onChange={handleChange}
            />

            <input
              name="JobRole"
              placeholder="Job Role"
              value={employee.JobRole}
              onChange={handleChange}
            />

            <input
              name="Education"
              placeholder="Education"
              type="number"
              value={employee.Education}
              onChange={handleChange}
            />

            <input
              name="EducationField"
              placeholder="Education Field"
              value={employee.EducationField}
              onChange={handleChange}
            />

            <input
              name="MaritalStatus"
              placeholder="Marital Status"
              value={employee.MaritalStatus}
              onChange={handleChange}
            />

            <input
              name="MonthlyIncome"
              placeholder="Monthly Income"
              type="number"
              value={employee.MonthlyIncome}
              onChange={handleChange}
            />

            <input
              name="JobLevel"
              placeholder="Job Level"
              type="number"
              value={employee.JobLevel}
              onChange={handleChange}
            />

            <input
              name="YearsAtCompany"
              placeholder="Years At Company"
              type="number"
              value={employee.YearsAtCompany}
              onChange={handleChange}
            />

            <input
              name="TrainingTimesLastYear"
              placeholder="Training Last Year"
              type="number"
              value={employee.TrainingTimesLastYear}
              onChange={handleChange}
            />

            <input
              name="EnvironmentSatisfaction"
              placeholder="Environment Satisfaction"
              type="number"
              value={employee.EnvironmentSatisfaction}
              onChange={handleChange}
            />

            <input
              name="JobSatisfaction"
              placeholder="Job Satisfaction"
              type="number"
              value={employee.JobSatisfaction}
              onChange={handleChange}
            />

            <input
              name="RelationshipSatisfaction"
              placeholder="Relationship Satisfaction"
              type="number"
              value={employee.RelationshipSatisfaction}
              onChange={handleChange}
            />

            <input
              name="WorkLifeBalance"
              placeholder="Work Life Balance"
              type="number"
              value={employee.WorkLifeBalance}
              onChange={handleChange}
            />

            <input
              name="YearsWithCurrManager"
              placeholder="Years With Current Manager"
              type="number"
              value={employee.YearsWithCurrManager}
              onChange={handleChange}
            />

            <input
              name="Attrition"
              placeholder="Attrition"
              value={employee.Attrition}
              onChange={handleChange}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "25px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit">
              {initialData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;