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

import { Box, Stack } from "@mui/material";

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

  useEffect(() => {
    loadEmployees(page);
  }, [page, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const loadEmployees = async (currentPage) => {
    try {
      setLoading(true);

      const data = await getEmployees(currentPage, 20, search);

      setEmployees(data.employees);
      setTotalPages(data.total_pages);
      setTotalEmployees(data.total_employees);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load employees.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setSearch("");
    loadEmployees(page);
  };

  // ==========================
  // Create OR Update Employee
  // ==========================

  const handleSaveEmployee = async (employee) => {
    try {
      if (selectedEmployee) {
        await updateEmployee(employee.EmpID, employee);

        alert("Employee updated successfully!");
      } else {
        await createEmployee(employee);

        alert("Employee added successfully!");
      }

      setOpenForm(false);
      setSelectedEmployee(null);

      loadEmployees(page);
    } catch (err) {
      console.error(err);
      alert("Unable to save employee.");
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

      alert("Employee deleted successfully!");

      loadEmployees(page);
    } catch (err) {
      console.error(err);
      alert("Unable to delete employee.");
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
        <Box sx={{ flex: 1 }}>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <div
          style={{
            display: "flex",
            gap: "10px",
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
          {error && <ErrorMessage message={error} />}

          <h3>Total Matching Employees : {totalEmployees}</h3>

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
              onClick={() => setPage(page - 1)}
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
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
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
    </div>
  );
}

export default Employees;