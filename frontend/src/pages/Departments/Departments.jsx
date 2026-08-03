import { useEffect, useState, useCallback } from "react";

import { getDepartments } from "../../services/departmentService";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import DepartmentStats from "../../components/cards/DepartmentStats";
import DepartmentCard from "../../components/cards/DepartmentCard";
import DepartmentTable from "../../components/tables/DepartmentTable";
import DepartmentPieChart from "../../components/charts/DepartmentPieChart";

import { Box, Stack } from "@mui/material";

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const loadDepartments = useCallback(async () => {
        try {
            setLoading(true);

            const data = await getDepartments();

            setDepartments(data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load departments.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadDepartments();
    }, [loadDepartments]);

    const filteredDepartments = departments.filter((dept) =>
        dept.department.toLowerCase().includes(search.toLowerCase()),
    );

    const handleRefresh = async () => {
        setSearch("");
        await loadDepartments();
    };

    return (
        <div className="page-container">
            <PageHeader
                title="Departments"
                subtitle="Manage and monitor all departments across the organization."
            />

            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                sx={{ mb: 3 }}
            >
                <Box sx={{ flex: 1 }}>
                    <SearchBar
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Department..."
                    />
                </Box>

                <RefreshButton onClick={handleRefresh} />
            </Stack>

            {loading ? (
                <Loader />
            ) : (
                <>
                    {error && <ErrorMessage message={error} />}

                    <DepartmentStats departments={filteredDepartments} />

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2,1fr)",
                                md: "repeat(3,1fr)",
                            },
                            gap: 3,
                            mb: 4,
                        }}
                    >
                        {filteredDepartments.map((dept) => (
                            <DepartmentCard
                                key={dept.department}
                                department={dept}
                            />
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                lg: "1fr 1fr",
                            },
                            gap: 3,
                            mb: 4,
                        }}
                    >
                        <DepartmentPieChart departments={filteredDepartments} />

                        <DepartmentTable departments={filteredDepartments} />
                    </Box>
                </>
            )}
        </div>
    );
}

export default Departments;
