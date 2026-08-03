import { useEffect, useState } from "react";

import MetricCard from "../../components/cards/MetricCard";

import GenderDistributionChart from "../../components/charts/GenderDistributionChart";
import AttritionChart from "../../components/charts/AttritionChart";
import DepartmentChart from "../../components/charts/DepartmentChart";

import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

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

            catch (err) {

                console.error(
                    "Dashboard API Error:",
                    err
                );

                setError(
                    "Unable to load dashboard data."
                );

            }

        };

        fetchDashboard();

    }, []);

    if (error) {
        return (
            <ErrorMessage
                message={error}
            />
        );
    }

    if (
        !dashboardData ||
        !attritionData
    ) {
        return (
            <Loader
                message="Loading Dashboard..."
            />
        );
    }

    return (

        <div>

            {/* Page Title Section */}

            <PageHeader

                title="Workforce Dashboard"

                subtitle="Overview of employee metrics and workforce trends"

            />

            {/* KPI Section */}

            <section>

                <h2 className="section-title">

                    Workforce Overview

                </h2>

                <div className="dashboard-grid">

                    <MetricCard
                        
                        title="Total Employees"

                        value={dashboardData.total_employees}

                        subtitle="Current workforce size"

                        icon="👥"

                    />

                    <MetricCard

                        title="Departments"

                        value={dashboardData.department_count}

                        subtitle="Active departments"

                        icon="🏢"

                    />

                    <MetricCard

                        title="Average Age"

                        value={dashboardData.average_age}

                        subtitle="Employee demographics"

                        icon="🎂"

                    />

                    <MetricCard

                        title="Average Monthly Income"

                        value={`$${(
                            dashboardData.average_monthly_income ?? 0
                        ).toLocaleString()}`}

                        subtitle="Average employee salary"

                        icon="💰"

                    />

                    <MetricCard

                        title="Attrition Rate"

                        value={dashboardData.attrition_rate}

                        subtitle="Employee turnover percentage"

                        icon="📉"

                    />

                </div>

            </section>

            {/* Charts Section */}

            <section>

                <h2 className="section-title">

                    Workforce Distribution

                </h2>

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

            </section>

        </div>

    );

}

export default Dashboard;