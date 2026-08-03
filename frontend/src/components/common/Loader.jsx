import { Box, CircularProgress, Typography } from "@mui/material";

function Loader({ message = "Loading..." }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "300px",
        width: "100%",
      }}
    >
      <CircularProgress size={45} />

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}

export default Loader;