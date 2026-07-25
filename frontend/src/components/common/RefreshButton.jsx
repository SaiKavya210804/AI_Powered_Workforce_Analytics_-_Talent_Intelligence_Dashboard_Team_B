import RefreshIcon from "@mui/icons-material/Refresh";
import { Button } from "@mui/material";

function RefreshButton({ onClick }) {
  return (
    <Button
      variant="contained"
      startIcon={<RefreshIcon />}
      onClick={onClick}
    >
      Refresh
    </Button>
  );
}

export default RefreshButton;