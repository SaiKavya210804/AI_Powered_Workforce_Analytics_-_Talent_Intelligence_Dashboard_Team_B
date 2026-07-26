import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../services/employeeService";

import EmployeeTable from "../../components/tables/EmployeeTable";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmployeeForm from "../../components/forms/EmployeeForm";
import EmployeeStats from "../../components/cards/EmployeeStats";

import {
  Box,
  Stack,
  Snackbar,
  Alert,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [department, setDepartment] = useState("");
const [jobRole, setJobRole] = useState("");
const [attrition, setAttrition] = useState("");

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
  loadEmployees();
}, [page, search, department, jobRole, attrition]);

useEffect(() => {
  setPage(1);
}, [search, department, jobRole, attrition]);

  const loadEmployees = async () => {
  try {
    setLoading(true);

    console.log("Sending Filters:", {
      page,
      search,
      department,
      jobRole,
      attrition,
    });



    const data = await getEmployees(
      page,
      20,
      search,
      department,
      jobRole,
      attrition
    );
    console.log("API Response:", data);
console.log("Total:", data.total_employees);
console.table(data.employees);

    setEmployees(data.employees || []);
    setTotalPages(data.total_pages || 1);
    setTotalEmployees(data.total_employees || 0);
    setError("");
  } catch (err) {
    console.error("Employee Fetch Error:", err);
    setError("Unable to load employees.");
  } finally {
    setLoading(false);
  }
};

const handleRefresh = () => {
  setSearch("");
  setDepartment("");
  setJobRole("");
  setAttrition("");
  setPage(1);

  loadEmployees();
};

  // Snackbar Helper
  const showSnackbar = (
    message,
    severity = "success"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // ==========================
  // Create OR Update Employee
  // ==========================

  const handleSaveEmployee = async (employee) => {
    try {
      if (selectedEmployee) {
        await updateEmployee(employee.EmpID, employee);

        showSnackbar(
          "Employee updated successfully!"
        );
      } else {
        await createEmployee(employee);

        showSnackbar(
          "Employee added successfully!"
        );
      }

      setOpenForm(false);
      setSelectedEmployee(null);

      loadEmployees(page);
    } catch (err) {
      console.error(err);

      showSnackbar(
        "Unable to save employee.",
        "error"
      );
    }
  };

  // ==========================
  // Edit Employee
  // ==========================

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenForm(true);
  };

  // ==========================
  // Delete Employee
  // ==========================

  const handleDeleteEmployee = async (empId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(empId);

      showSnackbar(
        "Employee deleted successfully!"
      );

      loadEmployees(page);
    } catch (err) {
      console.error(err);

      showSnackbar(
        "Unable to delete employee.",
        "error"
      );
    }
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Employee Management"
        subtitle="Manage employees, search records and navigate through workforce data."
      />

      <Stack
  direction={{ xs: "column", md: "row" }}
  spacing={2}
  sx={{ mb: 3 }}
>
  {/* Search */}
  <Box sx={{ flex: 1 }}>
    <SearchBar
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </Box>

  {/* Department Filter */}
  <FormControl sx={{ minWidth: 200 }}>
  <InputLabel>Department</InputLabel>

  <Select
    value={department}
    label="Department"
    onChange={(e) => setDepartment(e.target.value)}
  >
    <MenuItem value="">All</MenuItem>

    <MenuItem value="Sales">
      Sales
    </MenuItem>

    <MenuItem value="Research & Development">
      Research & Development
    </MenuItem>

    <MenuItem value="Human Resources">
      Human Resources
    </MenuItem>
  </Select>
</FormControl>

  {/* Job Role Filter */}
  <FormControl sx={{ minWidth: 220 }}>
  <InputLabel>Job Role</InputLabel>

  <Select
    value={jobRole}
    label="Job Role"
    onChange={(e) => setJobRole(e.target.value)}
  >
    <MenuItem value="">All</MenuItem>

    <MenuItem value="Healthcare Representative">
      Healthcare Representative
    </MenuItem>

    <MenuItem value="Human Resources">
      Human Resources
    </MenuItem>

    <MenuItem value="Laboratory Technician">
      Laboratory Technician
    </MenuItem>

    <MenuItem value="Manager">
      Manager
    </MenuItem>

    <MenuItem value="Manufacturing Director">
      Manufacturing Director
    </MenuItem>

    <MenuItem value="Research Director">
      Research Director
    </MenuItem>

    <MenuItem value="Research Scientist">
      Research Scientist
    </MenuItem>

    <MenuItem value="Sales Executive">
      Sales Executive
    </MenuItem>

    <MenuItem value="Sales Representative">
      Sales Representative
    </MenuItem>
  </Select>
</FormControl>

  {/* Attrition Filter */}
  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel>Attrition</InputLabel>

    <Select
  value={attrition}
  label="Attrition"
  onChange={(e) => {
    console.log("Attrition Selected:", e.target.value);
    setAttrition(e.target.value);
  }}
>
      <MenuItem value="">All</MenuItem>
      <MenuItem value="Yes">Yes</MenuItem>
      <MenuItem value="No">No</MenuItem>
    </Select>
  </FormControl>

  {/* Buttons */}
  <div
    style={{
      display: "flex",
      gap: "10px",
      alignItems: "center",
    }}
  >
    <RefreshButton onClick={handleRefresh} />

    <button
      onClick={() => {
        setSelectedEmployee(null);
        setOpenForm(true);
      }}
      style={{
        padding: "10px 18px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Add Employee
    </button>
  </div>
</Stack>

      {loading ? (
        <Loader />
      ) : (
        <>
          {error && (
  <ErrorMessage message={error} />
)}

<EmployeeStats
  employees={employees}
  totalEmployees={totalEmployees}
/>

<h3>
  Total Matching Employees : {totalEmployees}
</h3>

          <EmployeeTable
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "25px",
            }}
          >
            <button
              onClick={() =>
                setPage(page - 1)
              }
              disabled={page === 1}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Previous
            </button>

            <h3>
              Page {page} of {totalPages}
            </h3>

            <button
              onClick={() =>
                setPage(page + 1)
              }
              disabled={
                page === totalPages
              }
              style={{
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}

      <EmployeeForm
        open={openForm}
        employee={selectedEmployee}
        onClose={() => {
          setOpenForm(false);
          setSelectedEmployee(null);
        }}
        onSubmit={handleSaveEmployee}
      />

      {/* Snackbar */}
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
          sx={{ width: "100%" }}
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Employees;