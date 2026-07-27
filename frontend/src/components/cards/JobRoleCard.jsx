import { Card, CardContent, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

function JobRoleCard({ role }) {
  return (
    <Card elevation={3}>
      <CardContent>

        <WorkIcon
          color="primary"
          sx={{ fontSize: 40 }}
        />

        <Typography variant="h6">
          {role.job_role}
        </Typography>

        <Typography
          variant="h4"
          color="primary"
        >
          {role.employee_count}
        </Typography>

        <Typography>
          Employees
        </Typography>

      </CardContent>
    </Card>
  );
}

export default JobRoleCard;