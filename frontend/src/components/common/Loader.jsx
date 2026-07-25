import { Box, CircularProgress, Typography } from "@mui/material";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 5,
      }}
    >
      <CircularProgress />

      <Typography sx={{ mt: 2 }}>
        Loading Employees...
      </Typography>
    </Box>
  );
}

export default Loader;