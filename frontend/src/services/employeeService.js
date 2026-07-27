import api from "./api";


// ============================
// Get Employees (Pagination + Search + Filters)
// ============================

export const getEmployees = async (
  page = 1,
  limit = 20,
  search = "",
  department = "",
  jobRole = "",
  attrition = ""
) => {

  const params = {
    page,
    limit,
  };

  if (search && search.trim() !== "") {
    params.search = search.trim();
  }

  if (department) {
    params.department = department;
  }

  if (jobRole) {
    params.jobRole = jobRole;
  }

  if (attrition) {
    params.attrition = attrition;
  }


  console.log("Employees API Params:", params);


  const response = await api.get("/employees", {
    params,
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

  const response = await api.put(
    `/employee/${empId}`,
    employeeData
  );

  return response.data;
};



// ============================
// Delete Employee
// ============================

export const deleteEmployee = async (empId) => {

  const response = await api.delete(`/employee/${empId}`);

  return response.data;
};



// ============================
// Export Filtered Employees
// Reports Module
// ============================

export const exportFilteredEmployees = async (
  search = "",
  department = "",
  jobRole = "",
  attrition = ""
) => {

  const params = {};


  if (search && search.trim() !== "") {
    params.search = search.trim();
  }


  if (department) {
    params.department = department;
  }


  if (jobRole) {
    params.jobRole = jobRole;
  }


  if (attrition) {
    params.attrition = attrition;
  }



  console.log("Export API Params:", params);



  const response = await api.get(
    "/employees/export",
    {
      params,
    }
  );


  return response.data;
};