import { useEffect, useState } from "react";

import { getJobRoles } from "../../services/jobRoleService";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import RefreshButton from "../../components/common/RefreshButton";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";

import JobRoleCard from "../../components/cards/JobRoleCard";
import JobRoleTable from "../../components/tables/JobRoleTable";
import JobRolePieChart from "../../components/charts/JobRolePieChart";

import { Box, Stack } from "@mui/material";

function JobRoles() {
  const [jobRoles, setJobRoles] = useState([]);
  const [filteredJobRoles, setFilteredJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobRoles();
  }, []);

  useEffect(() => {
    const filtered = jobRoles.filter((role) =>
      role.job_role.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredJobRoles(filtered);
  }, [search, jobRoles]);

  const loadJobRoles = async () => {
    try {
      setLoading(true);

      const data = await getJobRoles();

      setJobRoles(data);
      setFilteredJobRoles(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load job roles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <PageHeader
        title="Job Roles"
        subtitle="View employee distribution across job roles."
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
            placeholder="Search Job Role..."
          />
        </Box>

        <RefreshButton onClick={loadJobRoles} />
      </Stack>

      {loading ? (
        <Loader />
      ) : (
        <>
          {error && <ErrorMessage message={error} />}

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
            {filteredJobRoles.map((role) => (
              <JobRoleCard
                key={role.job_role}
                role={role}
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
            }}
          >
            <JobRolePieChart
              jobRoles={filteredJobRoles}
            />

            <JobRoleTable
              jobRoles={filteredJobRoles}
            />
          </Box>
        </>
      )}
    </div>
  );
}

export default JobRoles;