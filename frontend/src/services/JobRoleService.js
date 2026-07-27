import api from "./api";

export const getJobRoles = async () => {
  const response = await api.get("/job-role-distribution");
  return response.data;
};