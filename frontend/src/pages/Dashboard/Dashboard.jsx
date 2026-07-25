import { useEffect, useState } from "react";


import MetricCard from "../../components/cards/MetricCard";


import GenderDistributionChart from "../../components/charts/GenderDistributionChart";
import AttritionChart from "../../components/charts/AttritionChart";
import DepartmentChart from "../../components/charts/DepartmentChart";


import { getDashboardData } from "../../services/dashboardService";


import {
    getAttritionData,
    getDepartmentData
} from "../../services/analyticsService";



function Dashboard() {


    const [dashboardData, setDashboardData] = useState(null);

    const [attritionData, setAttritionData] = useState(null);

    const [departmentData, setDepartmentData] = useState([]);

    const [error, setError] = useState(null);





    useEffect(() => {


        const fetchDashboard = async () => {


            try {


                const [
                    dashboard,
                    attrition,
                    departments

                ] = await Promise.all([

                    getDashboardData(),

                    getAttritionData(),

                    getDepartmentData()

                ]);



                setDashboardData(dashboard);

                setAttritionData(attrition);

                setDepartmentData(departments);



            }


            catch(error) {


                console.error(
                    "Dashboard API Error:",
                    error
                );


                setError(
                    "Unable to load dashboard data"
                );


            }


        };



        fetchDashboard();



    }, []);






    if(error) {

        return <h2>{error}</h2>;

    }





    if(
        !dashboardData ||
        !attritionData
    ) {

        return <h2>Loading Dashboard...</h2>;

    }






    return (


        <div>


            <h1>
                Dashboard
            </h1>




            <h2 className="section-title">
                Workforce Overview
            </h2>




            <div className="dashboard-grid">



                <MetricCard

                    title="Total Employees"

                    value={dashboardData.total_employees}

                    subtitle="Current workforce size"

                />




                <MetricCard

                    title="Departments"

                    value={dashboardData.department_count}

                    subtitle="Active departments"

                />




                <MetricCard

                    title="Average Age"

                    value={dashboardData.average_age}

                    subtitle="Employee demographics"

                />




                <MetricCard

                    title="Average Monthly Income"

                    value={`$${dashboardData.average_monthly_income.toLocaleString()}`}

                    subtitle="Average employee salary"

                />




                <MetricCard

                    title="Attrition Rate"

                    value={dashboardData.attrition_rate}

                    subtitle="Employee turnover percentage"

                />



            </div>







            <h2 className="section-title">
                Workforce Distribution
            </h2>





            <div className="dashboard-charts">





                <div className="chart-card">


                    <GenderDistributionChart

                        data={dashboardData.gender_distribution}

                    />


                </div>







                <div className="chart-card">


                    <AttritionChart

                        data={attritionData}

                    />


                </div>







                <div className="chart-card">


                    <DepartmentChart

                        data={departmentData}

                    />


                </div>





            </div>





        </div>


    );


}



export default Dashboard;