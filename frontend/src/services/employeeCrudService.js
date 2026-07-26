import api from "./api";

// Create Employee
export const createEmployee = async (employee) => {
  const response = await api.post("/employee", employee);
  return response.data;
};

// Update Employee
export const updateEmployee = async (empId, employee) => {
  const response = await api.put(`/employee/${empId}`, employee);
  return response.data;
};

// Delete Employee
export const deleteEmployee = async (empId) => {
  const response = await api.delete(`/employee/${empId}`);
  return response.data;
};