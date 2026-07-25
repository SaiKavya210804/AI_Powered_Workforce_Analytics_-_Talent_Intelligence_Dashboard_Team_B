import { TextField } from "@mui/material";

function SearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      label="Search Employee ID"
      placeholder="Enter Employee ID..."
      value={value}
      onChange={onChange}
      size="small"
    />
  );
}

export default SearchBar;