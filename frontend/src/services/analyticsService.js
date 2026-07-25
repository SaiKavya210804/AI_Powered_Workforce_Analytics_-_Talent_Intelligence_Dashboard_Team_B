import api from "./api";


export const getAttritionData = async () => {

    const response = await api.get("/attrition");

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