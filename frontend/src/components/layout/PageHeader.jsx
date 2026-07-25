import { Box, Typography } from "@mui/material";

function PageHeader({ title, subtitle }) {
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default PageHeader;