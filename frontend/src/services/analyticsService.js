import api from "./api";


export const getAttritionData = async () => {

    const response = await api.get("/attrition");

    return response.data;

};


export const getDepartmentData = async () => {

    const response = await api.get("/departments");

    return response.data;

};


export const getGenderDistribution = async () => {

    const response = await api.get("/gender-distribution");

    return response.data;

};


export const getJobRoleDistribution = async () => {

    const response = await api.get("/job-role-distribution");

    return response.data;

};


export const getSalaryAnalytics = async () => {

    const response = await api.get("/salary-analytics");

    return response.data;

};


export const getAgeAnalytics = async () => {

    const response = await api.get("/age-analytics");

    return response.data;

};

export const getEmployeeWellbeing = async () => {

    const response = await api.get("/employee-wellbeing");

    return response.data;

};


export const getExperienceSummary = async () => {

    const response = await api.get("/experience-summary");

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

export const getAttritionByDepartment = async () => {

    const response = await api.get("/attrition-by-department");

    return response.data;

};

export const getSalaryDistribution = async () => {

    const response = await api.get("/salary-distribution");

    return response.data;

};