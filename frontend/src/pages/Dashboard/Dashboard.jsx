import { useEffect, useState } from "react";

import MetricCard from "../../components/cards/MetricCard";

import GenderDistributionChart from "../../components/charts/GenderDistributionChart";

import { getDashboardData } from "../../services/dashboardService";



function Dashboard() {

    const [dashboardData, setDashboardData] = useState(null);


    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboardData();

                setDashboardData(data);

            }

            catch(error) {

                console.error(
                    "Dashboard API Error:",
                    error
                );

            }

        };


        fetchDashboard();

    }, []);



    if (!dashboardData) {

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


        <GenderDistributionChart

            data={dashboardData.gender_distribution}

        />


    </div>

);

}


export default Dashboard;