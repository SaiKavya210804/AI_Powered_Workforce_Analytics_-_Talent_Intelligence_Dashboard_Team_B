import { useEffect, useState } from "react";


import MetricCard from "../../components/cards/MetricCard";


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



    useEffect(() => {


        const fetchAnalytics = async () => {


            try {


                const jobRole =
                    await getJobRoleDistribution();


                const salary =
                    await getSalaryAnalytics();


                const age =
                    await getAgeAnalytics();


                const satisfaction =
                    await getJobSatisfaction();


                const workLife =
                    await getWorkLifeBalance();


                const attritionDepartment =
                    await getAttritionByDepartment();



                const wellbeing =
                    await getEmployeeWellbeing();



                const salaryDepartment =
                    await getSalaryDistribution();



                const attrition =
                    await getAttritionData();



                const experience =
                    await getExperienceSummary();




                setAnalyticsData({

                    jobRole,

                    salary,

                    age,

                    satisfaction,

                    workLife,

                    attritionDepartment,

                    wellbeing,

                    salaryDepartment

                });



                setAttritionData(attrition);


                setExperienceData(experience);



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





    if(
        !analyticsData ||
        !attritionData ||
        !experienceData
    ){

        return <h2>Loading Analytics...</h2>;

    }






    return (

        <div>


            <h1>
                Workforce Analytics
            </h1>



            {/* Analytics KPI Cards */}

            <div className="dashboard-grid">


                <MetricCard

                    title="Attrition Rate"

                    value={attritionData.attrition_rate}

                />



                <MetricCard

                    title="Employees Left"

                    value={attritionData.employees_with_attrition}

                />



                <MetricCard

                    title="Average Experience"

                    value={`${experienceData.average_experience} years`}

                />



                <MetricCard

                    title="Maximum Experience"

                    value={`${experienceData.maximum_experience} years`}

                />


            </div>






            {/* Analytics Charts */}


            <div className="dashboard-charts">



                <div className="chart-card">

                    <JobRoleChart

                        data={analyticsData.jobRole}

                    />

                </div>





                <div className="chart-card">

                    <SalaryChart

                        data={analyticsData.salary}

                    />

                </div>





                <div className="chart-card">

                    <AgeChart

                        data={analyticsData.age}

                    />

                </div>





                <div className="chart-card">

                    <SatisfactionChart

                        data={analyticsData.satisfaction}

                    />

                </div>





                <div className="chart-card">

                    <WorkLifeChart

                        data={analyticsData.workLife}

                    />

                </div>





                <div className="chart-card">

                    <AttritionDepartmentChart

                        data={analyticsData.attritionDepartment}

                    />

                </div>





                <div className="chart-card">

                    <WellbeingChart

                        data={analyticsData.wellbeing}

                    />

                </div>





                <div className="chart-card">

                    <SalaryDepartmentChart

                        data={analyticsData.salaryDepartment}

                    />

                </div>



            </div>



        </div>

    );


}


export default Analytics;