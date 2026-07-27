import api from "./api";

export const getAttrition = async () => {
    const response = await api.get("/attrition");
    return response.data;
};

export const getDepartmentAttrition = async () => {
    const response = await api.get("/attrition-by-department");
    return response.data;
};

export const getWellbeing = async () => {
    const response = await api.get("/employee-wellbeing");
    return response.data;
};

export const getJobSatisfaction = async () => {
    const response = await api.get("/job-satisfaction");
    return response.data;
};

export const getWorkLifeBalance = async () => {
    const response = await api.get("/work-life-balance");
    return response.data;
};