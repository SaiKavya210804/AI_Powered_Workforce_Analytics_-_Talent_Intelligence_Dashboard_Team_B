import { useState, useEffect } from "react";

function EmployeeForm({
  open,
  onClose,
  onSubmit,
  employee: initialData = null,
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
      setEmployee({
        ...emptyEmployee,
        ...initialData,
      });
    } else {
      setEmployee(emptyEmployee);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setEmployee((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        background: "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
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
              disabled={initialData !== null}
            />

            <input
              type="number"
              name="Age"
              placeholder="Age"
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
              type="number"
              name="Education"
              placeholder="Education"
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
              type="number"
              name="MonthlyIncome"
              placeholder="Monthly Income"
              value={employee.MonthlyIncome}
              onChange={handleChange}
            />

            <input
              type="number"
              name="JobLevel"
              placeholder="Job Level"
              value={employee.JobLevel}
              onChange={handleChange}
            />

            <input
              type="number"
              name="YearsAtCompany"
              placeholder="Years At Company"
              value={employee.YearsAtCompany}
              onChange={handleChange}
            />

            <input
              type="number"
              name="TrainingTimesLastYear"
              placeholder="Training Times Last Year"
              value={employee.TrainingTimesLastYear}
              onChange={handleChange}
            />

            <input
              type="number"
              name="EnvironmentSatisfaction"
              placeholder="Environment Satisfaction"
              value={employee.EnvironmentSatisfaction}
              onChange={handleChange}
            />

            <input
              type="number"
              name="JobSatisfaction"
              placeholder="Job Satisfaction"
              value={employee.JobSatisfaction}
              onChange={handleChange}
            />

            <input
              type="number"
              name="RelationshipSatisfaction"
              placeholder="Relationship Satisfaction"
              value={employee.RelationshipSatisfaction}
              onChange={handleChange}
            />

            <input
              type="number"
              name="WorkLifeBalance"
              placeholder="Work Life Balance"
              value={employee.WorkLifeBalance}
              onChange={handleChange}
            />

            <input
              type="number"
              name="YearsWithCurrManager"
              placeholder="Years With Current Manager"
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
              style={{
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {initialData ? "Update Employee" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;