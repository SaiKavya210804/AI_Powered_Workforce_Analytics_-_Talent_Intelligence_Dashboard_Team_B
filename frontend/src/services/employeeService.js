import api from "./api";


export const getEmployees = async (page = 1, limit = 20) => {
  const response = await api.get(
    `/employees?page=${page}&limit=${limit}`
  );

  return response.data;
};

export const getEmployeeById = async (empId) => {
  const response = await api.get(`/employee/${empId}`);
  return response.data;
};