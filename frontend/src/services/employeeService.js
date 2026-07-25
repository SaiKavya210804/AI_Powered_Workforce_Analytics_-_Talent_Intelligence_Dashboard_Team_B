import api from "./api";


export const getEmployees = async () => {

    const response = await api.get("/employees");

    return response.data;

};


export const getEmployeeById = async (emp_id) => {

    const response = await api.get(`/employee/${emp_id}`);

    return response.data;

};