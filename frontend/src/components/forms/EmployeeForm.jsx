import { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

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
  const departmentJobRoles = {
  "Research & Development": [
    "Healthcare Representative",
    "Laboratory Technician",
    "Manager",
    "Manufacturing Director",
    "Research Director",
    "Research Scientist",
  ],

  Sales: [
    "Manager",
    "Sales Executive",
    "Sales Representative",
  ],

  "Human Resources": [
    "Human Resources",
    "Manager",
  ],
};

const genders = ["Male", "Female"];

const educationLevels = [
  { value: 1, label: "Below College" },
  { value: 2, label: "College" },
  { value: 3, label: "Bachelor" },
  { value: 4, label: "Master" },
  { value: 5, label: "Doctor" },
];

const educationFields = [
  "Life Sciences",
  "Medical",
  "Marketing",
  "Technical Degree",
  "Human Resources",
  "Other",
];

const maritalStatuses = [
  "Single",
  "Married",
  "Divorced",
];

const jobLevels = [1, 2, 3, 4, 5];

const trainingTimes = [0, 1, 2, 3, 4, 5, 6];

const satisfactionLevels = [
  { value: 1, label: "Low" },
  { value: 2, label: "Medium" },
  { value: 3, label: "High" },
  { value: 4, label: "Very High" },
];

const attritionOptions = ["Yes", "No"];

  const [employee, setEmployee] = useState(emptyEmployee);
  const [snackbar, setSnackbar] = useState({
  open: false,
  message: "",
  severity: "warning",
});

const showSnackbar = (message, severity = "warning") => {
  setSnackbar({
    open: true,
    message,
    severity,
  });
};
  const inputStyle = {
  width: "100%",
  height: "46px",
  padding: "10px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

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
  const { name, value } = e.target;

  if (name === "Department") {
    setEmployee((prev) => ({
      ...prev,
      Department: value,
      JobRole: "", // Reset Job Role when Department changes
    }));
  } else {
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = (e) => {
  e.preventDefault();

  // Employee ID
if (!employee.EmpID.trim()) {
  showSnackbar("Employee ID is required");
  return;
}

const empIdPattern = /^EMP\d+$/;

if (!empIdPattern.test(employee.EmpID)) {
  showSnackbar("Employee ID must be in format EMP followed by numbers (Example: EMP001)");
  return;
}

  // Age
  if (!employee.Age) {
    showSnackbar("Age is required");
    return;
  }

  if (Number(employee.Age) < 18 || Number(employee.Age) > 60) {
    showSnackbar("Age must be between 18 and 60");
    return;
  }

  // Gender
  if (!employee.Gender) {
    showSnackbar("Please select Gender");
    return;
  }

  // Department
  if (!employee.Department) {
    showSnackbar("Please select Department");
    return;
  }

  // Job Role
  if (!employee.JobRole) {
    showSnackbar("Please select Job Role");
    return;
  }

  // Education
  if (!employee.Education) {
    showSnackbar("Please select Education");
    return;
  }

  // Education Field
  if (!employee.EducationField) {
    showSnackbar("Please select Education Field");
    return;
  }

  // Marital Status
  if (!employee.MaritalStatus) {
    showSnackbar("Please select Marital Status");
    return;
  }

  // Monthly Income
  if (!employee.MonthlyIncome) {
    showSnackbar("Monthly Income is required");
    return;
  }

  if (Number(employee.MonthlyIncome) <= 0) {
  showSnackbar("Monthly Income must be greater than 0");
  return;
}

if (Number(employee.MonthlyIncome) < 1000) {
  showSnackbar("Monthly Income must be at least 1000");
  return;
}

  // Job Level
  if (!employee.JobLevel) {
    showSnackbar("Please enter Job Level");
    return;
  }

  if (Number(employee.JobLevel) < 1 || Number(employee.JobLevel) > 5) {
    showSnackbar("Job Level must be between 1 and 5");
    return;
  }

  // Years At Company
  if (employee.YearsAtCompany === "") {
    showSnackbar("Years At Company is required");
    return;
  }

  if (Number(employee.YearsAtCompany) < 0) {
    showSnackbar("Years At Company cannot be negative");
    return;
  }

  // Training Times
  if (employee.TrainingTimesLastYear === "") {
    showSnackbar("Training Times Last Year is required");
    return;
  }

  if (
    Number(employee.TrainingTimesLastYear) < 0 ||
    Number(employee.TrainingTimesLastYear) > 6
  ) {
    showSnackbar("Training Times Last Year must be between 0 and 6");
    return;
  }

  // Environment Satisfaction
  if (
    Number(employee.EnvironmentSatisfaction) < 1 ||
    Number(employee.EnvironmentSatisfaction) > 4
  ) {
    showSnackbar("Environment Satisfaction must be between 1 and 4");
    return;
  }

  // Job Satisfaction
  if (
    Number(employee.JobSatisfaction) < 1 ||
    Number(employee.JobSatisfaction) > 4
  ) {
    showSnackbar("Job Satisfaction must be between 1 and 4");
    return;
  }

  // Relationship Satisfaction
  if (
    Number(employee.RelationshipSatisfaction) < 1 ||
    Number(employee.RelationshipSatisfaction) > 4
  ) {
    showSnackbar("Relationship Satisfaction must be between 1 and 4");
    return;
  }

  // Work Life Balance
  if (
    Number(employee.WorkLifeBalance) < 1 ||
    Number(employee.WorkLifeBalance) > 4
  ) {
    showSnackbar("Work Life Balance must be between 1 and 4");
    return;
  }

  // Years With Current Manager
  if (employee.YearsWithCurrManager === "") {
    showSnackbar("Years With Current Manager is required");
    return;
  }

  if (Number(employee.YearsWithCurrManager) < 0) {
    showSnackbar("Years With Current Manager cannot be negative");
    return;
  }

  // Attrition
  if (!employee.Attrition) {
    showSnackbar("Please select Attrition");
    return;
  }

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
          width: "950px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: "10px",
          padding: "35px",
        }}
      >
        <h2
  style={{
    marginBottom: "30px",
    color: "#1f2937",
    fontSize: "26px",
    fontWeight: "700",
    borderBottom: "2px solid #2563eb",
    paddingBottom: "10px",
  }}
>
  {initialData ? "Edit Employee" : "Add New Employee"}
</h2>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(260px, 1fr))",
              rowGap: "18px",
columnGap: "25px",
            }}
          >
            <h3
  style={{
    gridColumn: "1 / -1",
    color: "#2563eb",
    marginTop: "10px",
    marginBottom: "10px",
  }}
>
  Personal Information
</h3>
<div style={fieldStyle}>

<label style={labelStyle}>
Employee ID *
</label>

            <input
              name="EmpID"
              placeholder="Employee ID"
              value={employee.EmpID}
              onChange={handleChange}
              style={inputStyle}
              disabled={initialData !== null}
            />
            </div>
            <div style={fieldStyle}>

<label style={labelStyle}>
Age *
</label>


            <input
              type="number"
              name="Age"
              placeholder="Age"
              value={employee.Age}
              style={inputStyle}
              onChange={handleChange}
            />
            </div>

            <div style={fieldStyle}>
    <label style={labelStyle}>Gender *</label>

    <select
        name="Gender"
        value={employee.Gender}
        onChange={handleChange}
        style={inputStyle}
    >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
</div>

            <div style={fieldStyle}>
  <label style={labelStyle}>Department *</label>

  <select
    name="Department"
    value={employee.Department}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Department</option>

    <option value="Research & Development">
      Research & Development
    </option>

    <option value="Sales">
      Sales
    </option>

    <option value="Human Resources">
      Human Resources
    </option>

  </select>
</div>

            <div style={fieldStyle}>
  <label style={labelStyle}>Job Role *</label>

  <select
    name="JobRole"
    value={employee.JobRole}
    onChange={handleChange}
    style={{
  ...inputStyle,
  maxWidth: "100%",
}}
    disabled={!employee.Department}
  >
    <option value="">Select Job Role</option>

    {employee.Department &&
      departmentJobRoles[employee.Department].map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
  </select>
</div>

            <div style={fieldStyle}>
  <label style={labelStyle}>
    Education <span style={{ color: "red" }}>*</span>
  </label>

  <select
    name="Education"
    value={employee.Education}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Education</option>
    <option value="1">Below College</option>
    <option value="2">College</option>
    <option value="3">Bachelor</option>
    <option value="4">Master</option>
    <option value="5">Doctor</option>
  </select>
</div>

<div style={fieldStyle}>
  <label style={labelStyle}>
    Education Field <span style={{ color: "red" }}>*</span>
  </label>

  <select
    name="EducationField"
    value={employee.EducationField}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Education Field</option>
    <option value="Life Sciences">Life Sciences</option>
    <option value="Medical">Medical</option>
    <option value="Marketing">Marketing</option>
    <option value="Technical Degree">Technical Degree</option>
    <option value="Human Resources">Human Resources</option>
    <option value="Other">Other</option>
  </select>
</div>

            <h3
  style={{
    gridColumn: "1 / -1",
    color: "#2563eb",
    marginTop: "20px",
    marginBottom: "10px",
  }}
>
  Job Information
</h3>

            <div style={fieldStyle}>

<label style={labelStyle}>
Marital Status *
</label>

<select
name="MaritalStatus"
value={employee.MaritalStatus}
onChange={handleChange}
style={inputStyle}
>

<option value="">Select</option>

<option value="Single">Single</option>

<option value="Married">Married</option>

<option value="Divorced">Divorced</option>

</select>

</div>
<div style={fieldStyle}>

<label style={labelStyle}>
Monthly Income *
</label>


            <input
              type="number"
              name="MonthlyIncome"
              placeholder="Monthly Income"
              value={employee.MonthlyIncome}
              style={inputStyle}
              onChange={handleChange}
            />
            </div>

            <div style={fieldStyle}>

<label style={labelStyle}>
Job Level *
</label>

<select
name="JobLevel"
value={employee.JobLevel}
onChange={handleChange}
style={inputStyle}
>

<option value="">Select</option>

<option value="1">Level 1</option>

<option value="2">Level 2</option>

<option value="3">Level 3</option>

<option value="4">Level 4</option>

<option value="5">Level 5</option>

</select>

</div>

            <div style={fieldStyle}>
  <label style={labelStyle}>Years At Company *</label>
  <input
    type="number"
    name="YearsAtCompany"
    value={employee.YearsAtCompany}
    onChange={handleChange}
    style={inputStyle}
    placeholder="Enter Years At Company"
    min="0"
  />
</div>

<div style={fieldStyle}>
  <label style={labelStyle}>Training Times Last Year *</label>
  <select
    name="TrainingTimesLastYear"
    value={employee.TrainingTimesLastYear}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Training Times</option>
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
  </select>
</div>
<h3
  style={{
    gridColumn: "1 / -1",
    color: "#2563eb",
    marginTop: "20px",
    marginBottom: "10px",
  }}
>
  Employee Satisfaction
</h3>

<div style={fieldStyle}>
  <label style={labelStyle}>Environment Satisfaction *</label>
  <select
    name="EnvironmentSatisfaction"
    value={employee.EnvironmentSatisfaction}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Satisfaction</option>
    <option value="1">1 - Low</option>
    <option value="2">2 - Medium</option>
    <option value="3">3 - High</option>
    <option value="4">4 - Very High</option>
  </select>
</div>

<div style={fieldStyle}>
  <label style={labelStyle}>Job Satisfaction *</label>
  <select
    name="JobSatisfaction"
    value={employee.JobSatisfaction}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Satisfaction</option>
    <option value="1">1 - Low</option>
    <option value="2">2 - Medium</option>
    <option value="3">3 - High</option>
    <option value="4">4 - Very High</option>
  </select>
</div>

<div style={fieldStyle}>
  <label style={labelStyle}>Relationship Satisfaction *</label>
  <select
    name="RelationshipSatisfaction"
    value={employee.RelationshipSatisfaction}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Satisfaction</option>
    <option value="1">1 - Low</option>
    <option value="2">2 - Medium</option>
    <option value="3">3 - High</option>
    <option value="4">4 - Very High</option>
  </select>
</div>

<div style={fieldStyle}>
  <label style={labelStyle}>Work Life Balance *</label>
  <select
    name="WorkLifeBalance"
    value={employee.WorkLifeBalance}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Work Life Balance</option>
    <option value="1">1 - Bad</option>
    <option value="2">2 - Good</option>
    <option value="3">3 - Better</option>
    <option value="4">4 - Best</option>
  </select>
</div>
<h3
  style={{
    gridColumn: "1 / -1",
    color: "#2563eb",
    marginTop: "20px",
    marginBottom: "10px",
  }}
>
  Additional Information
</h3>

<div style={fieldStyle}>
  <label style={labelStyle}>Years With Current Manager *</label>
  <input
    type="number"
    name="YearsWithCurrManager"
    value={employee.YearsWithCurrManager}
    onChange={handleChange}
    style={inputStyle}
    placeholder="Enter Years With Current Manager"
    min="0"
  />
</div>

<div style={fieldStyle}>
  <label style={labelStyle}>Attrition *</label>
  <select
    name="Attrition"
    value={employee.Attrition}
    onChange={handleChange}
    style={inputStyle}
  >
    <option value="">Select Attrition</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>

          <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "30px",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "20px",
  }}
>
  <button
    type="button"
    onClick={onClose}
    style={{
      padding: "12px 24px",
      background: "#f3f4f6",
      color: "#374151",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "0.2s",
    }}
  >
    Cancel
  </button>

  <button
    type="submit"
    style={{
      padding: "12px 24px",
      background: "#2563eb",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(37,99,235,0.25)",
      transition: "0.2s",
    }}
  >
    {initialData ? "Update Employee" : "Add Employee"}
  </button>
</div>
          </div>
        </form>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </div>
  );
      

      
    
}



export default EmployeeForm;