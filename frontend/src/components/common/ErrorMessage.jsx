import { Alert, Box } from "@mui/material";

function ErrorMessage({
  message = "Something went wrong. Please try again.",
}) {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Alert severity="error" variant="filled">
        {message}
      </Alert>
    </Box>
  );
}

export default ErrorMessage;