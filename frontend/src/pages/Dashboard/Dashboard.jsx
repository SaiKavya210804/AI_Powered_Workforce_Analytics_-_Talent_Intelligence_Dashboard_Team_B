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


            <h1>Dashboard</h1>





            <div className="dashboard-grid">



                <MetricCard

                    title="Total Employees"

                    value={dashboardData.total_employees}

                />




                <MetricCard

                    title="Departments"

                    value={dashboardData.department_count}

                />




                <MetricCard

                    title="Average Age"

                    value={dashboardData.average_age}

                />




                <MetricCard

                    title="Average Monthly Income"

                    value={`$${dashboardData.average_monthly_income.toLocaleString()}`}

                />




                <MetricCard

                    title="Attrition Rate"

                    value={dashboardData.attrition_rate}

                />


            </div>





            <div className="dashboard-charts">



                <GenderDistributionChart

                    data={dashboardData.gender_distribution}

                />




                <AttritionChart

                    data={attritionData}

                />




                <DepartmentChart

                    data={departmentData}

                />


            </div>





        </div>


    );


}



export default Dashboard;