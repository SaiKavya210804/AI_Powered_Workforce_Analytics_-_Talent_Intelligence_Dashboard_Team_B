import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/Employees/Employees";
import Departments from "../pages/Departments/Departments";
import Analytics from "../pages/Analytics/Analytics";
import AIAssistant from "../pages/AIAssistant/AIAssistant";
import Settings from "../pages/Settings/Settings";
import JobRoles from "../pages/JobRoles/JobRoles";

function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Layout />}>

                <Route index element={<Dashboard />} />

                <Route 
                    path="employees" 
                    element={<Employees />} 
                />
                <Route
                    path="departments"
                    element={<Departments />}
                />

                <Route
    path="job-roles"
    element={<JobRoles />}
/>

                <Route 
                    path="analytics" 
                    element={<Analytics />} 
                />

                <Route 
                    path="ai-assistant" 
                    element={<AIAssistant />} 
                />

                <Route 
                    path="settings" 
                    element={<Settings />} 
                />

            </Route>

        </Routes>
    );
}

export default AppRoutes;