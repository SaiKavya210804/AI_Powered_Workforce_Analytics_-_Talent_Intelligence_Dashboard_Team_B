import { Card, CardContent, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";

function DepartmentCard({ department }) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>

        <ApartmentIcon
          color="primary"
          sx={{ fontSize: 40 }}
        />

        <Typography
          variant="h6"
          sx={{ mt: 1 }}
        >
          {department.department}
        </Typography>

        <Typography
          variant="h4"
          color="primary"
          fontWeight="bold"
        >
          {department.employee_count}
        </Typography>

        <Typography
          color="text.secondary"
        >
          Employees
        </Typography>

      </CardContent>
    </Card>
  );
}

export default DepartmentCard;