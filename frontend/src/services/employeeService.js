import api from "./api";

// ============================
// Get Employees (Pagination + Search)
// ============================

export const getEmployees = async (
  page = 1,
  limit = 20,
  search = ""
) => {
  const response = await api.get("/employees", {
    params: {
      page,
      limit,
      search,
    },
  });

  return response.data;
};

// ============================
// Get Employee By ID
// ============================

export const getEmployeeById = async (empId) => {
  const response = await api.get(`/employee/${empId}`);
  return response.data;
};

// ============================
// Create Employee
// ============================

export const createEmployee = async (employeeData) => {
  const response = await api.post("/employee", employeeData);
  return response.data;
};

// ============================
// Update Employee
// ============================

export const updateEmployee = async (empId, employeeData) => {
  const response = await api.put(`/employee/${empId}`, employeeData);
  return response.data;
};

// ============================
// Delete Employee
// ============================

export const deleteEmployee = async (empId) => {
  const response = await api.delete(`/employee/${empId}`);
  return response.data;
};