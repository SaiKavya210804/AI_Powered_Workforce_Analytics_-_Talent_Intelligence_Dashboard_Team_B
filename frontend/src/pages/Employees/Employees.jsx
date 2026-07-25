import { useEffect, useState } from "react";
import { getEmployees } from "../../services/employeeService";

import EmployeeTable from "../../components/tables/EmployeeTable";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import { Box, Stack } from "@mui/material";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadEmployees(page);
  }, [page]);

  const loadEmployees = async (currentPage) => {
    try {
      setLoading(true);

      const data = await getEmployees(currentPage, 20);

      setEmployees(data.employees);
      setTotalPages(data.total_pages);
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

  const filteredEmployees = employees.filter((emp) => {
    const value = search.toLowerCase();

    return (
      emp.EmpID.toLowerCase().includes(value) ||
      emp.Department.toLowerCase().includes(value) ||
      emp.JobRole.toLowerCase().includes(value) ||
      emp.Gender.toLowerCase().includes(value) ||
      emp.Attrition.toLowerCase().includes(value)
    );
  });

  return (
    <div className="page-container">
      <PageHeader
        title="Employee Management"
        subtitle="Manage employees, search records and navigate through workforce data."
      />

      {/* Search + Refresh */}

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

        <RefreshButton onClick={handleRefresh} />
      </Stack>

      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <ErrorMessage message={error} />}

          <h3>Total Employees Loaded : {filteredEmployees.length}</h3>

          {/* Employee Table */}

          <EmployeeTable employees={filteredEmployees} />

          {/* Pagination */}

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
    </div>
  );
}

export default Employees;