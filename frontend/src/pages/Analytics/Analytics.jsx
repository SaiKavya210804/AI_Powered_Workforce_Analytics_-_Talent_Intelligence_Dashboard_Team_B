import { useEffect, useState } from "react";


import MetricCard from "../../components/cards/MetricCard";

import PageHeader from "../../components/common/PageHeader";


import JobRoleChart from "../../components/charts/JobRoleChart";
import SalaryChart from "../../components/charts/SalaryChart";
import AgeChart from "../../components/charts/AgeChart";
import SatisfactionChart from "../../components/charts/SatisfactionChart";
import WorkLifeChart from "../../components/charts/WorkLifeChart";
import AttritionDepartmentChart from "../../components/charts/AttritionDepartmentChart";
import WellbeingChart from "../../components/charts/WellbeingChart";
import SalaryDepartmentChart from "../../components/charts/SalaryDepartmentChart";


import {
    getJobRoleDistribution,
    getSalaryAnalytics,
    getAgeDistribution,
    getAgeAnalytics,
    getJobSatisfaction,
    getWorkLifeBalance,
    getAttritionByDepartment,
    getEmployeeWellbeing,
    getSalaryDistribution,
    getAttritionData,
    getExperienceSummary

} from "../../services/analyticsService";



function Analytics() {


    const [analyticsData, setAnalyticsData] = useState(null);

    const [attritionData, setAttritionData] = useState(null);

    const [experienceData, setExperienceData] = useState(null);

    const [ageAnalyticsData, setAgeAnalyticsData] = useState(null);



    useEffect(() => {


        const fetchAnalytics = async () => {


            try {


                const [

                    jobRole,

                    salary,

                    ageDistribution,

                    ageAnalytics,

                    satisfaction,

                    workLife,

                    attritionDepartment,

                    wellbeing,

                    salaryDepartment,

                    attrition,

                    experience


                ] = await Promise.all([


                    getJobRoleDistribution(),

                    getSalaryAnalytics(),

                    getAgeDistribution(),

                    getAgeAnalytics(),

                    getJobSatisfaction(),

                    getWorkLifeBalance(),

                    getAttritionByDepartment(),

                    getEmployeeWellbeing(),

                    getSalaryDistribution(),

                    getAttritionData(),

                    getExperienceSummary()


                ]);



                setAnalyticsData({

                    jobRole,

                    salary,

                    ageDistribution,

                    satisfaction,

                    workLife,

                    attritionDepartment,

                    wellbeing,

                    salaryDepartment

                });



                setAttritionData(attrition);

                setExperienceData(experience);

                setAgeAnalyticsData(ageAnalytics);



            }


            catch(error) {


                console.error(
                    "Analytics API Error:",
                    error
                );


            }


        };


        fetchAnalytics();


    }, []);






    if (

        !analyticsData ||

        !attritionData ||

        !experienceData ||

        !ageAnalyticsData

    ) {


        return <h2>Loading Analytics...</h2>;


    }






    return (


        <div>


            <PageHeader

                title="Workforce Analytics"

                subtitle="Analyze employee demographics, attrition, salary and wellbeing insights"

            />






            {/* KPI SECTION */}


            <h2 className="section-title">

                Key Performance Metrics

            </h2>



            <div className="dashboard-grid">



                <MetricCard

                    title="Total Employees"

                    value={attritionData.total_employees}

                    subtitle="Current workforce size"

                    color="#2563eb"

                    icon="👥"

                />



                <MetricCard

                    title="Attrition Rate"

                    value={attritionData.attrition_rate}

                    subtitle="Employee turnover percentage"

                    color="#ef4444"

                    icon="⚠️"

                />



                <MetricCard

                    title="Average Age"

                    value={`${Math.round(ageAnalyticsData.average_age)} years`}

                    subtitle="Average workforce age"

                    color="#8b5cf6"

                    icon="🎂"

                />


                <MetricCard

                    title="Average Salary"

                    value={
                        `$${Math.round(
                            analyticsData.salary.average_salary
                        ).toLocaleString()}`
                    }

                    subtitle="Average monthly income"

                    color="#059669"

                    icon="💰"

                />



                <MetricCard

                    title="Average Experience"

                    value={`${Math.round(experienceData.average_experience)} years`}

                    subtitle="Average employee tenure"

                    color="#f59e0b"

                    icon="📈"

                />



                <MetricCard

                    title="Maximum Experience"

                    value={`${experienceData.maximum_experience} years`}

                    subtitle="Highest employee tenure"

                    color="#0ea5e9"

                    icon="🏆"

                />


            </div>









            {/* EMPLOYEE DISTRIBUTION */}



            <h2 className="section-title">

                Employee Distribution Analysis

            </h2>



            <div className="dashboard-charts">



                <JobRoleChart

                    data={analyticsData.jobRole}

                />



                <AgeChart

                    data={analyticsData.ageDistribution}

                />


            </div>









            {/* COMPENSATION ANALYSIS */}



            <h2 className="section-title">

                Compensation Analysis

            </h2>



            <div className="dashboard-charts">



                <SalaryChart

                    data={analyticsData.salary}

                />



                <SalaryDepartmentChart

                    data={analyticsData.salaryDepartment}

                />


            </div>









            {/* EXPERIENCE ANALYSIS */}



            <h2 className="section-title">

                Employee Experience Analysis

            </h2>



            <div className="dashboard-charts">



                <SatisfactionChart

                    data={analyticsData.satisfaction}

                />



                <WorkLifeChart

                    data={analyticsData.workLife}

                />


            </div>









            {/* WORKFORCE HEALTH */}



            <h2 className="section-title">

                Workforce Health & Attrition

            </h2>



            <div className="dashboard-charts">



                <WellbeingChart

                    data={analyticsData.wellbeing}

                />



                <AttritionDepartmentChart

                    data={analyticsData.attritionDepartment}

                />


            </div>




        </div>


    );


}


export default Analytics;