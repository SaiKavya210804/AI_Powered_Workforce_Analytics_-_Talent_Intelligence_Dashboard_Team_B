import { TextField } from "@mui/material";

function SearchBar({
  value,
  onChange,
  placeholder = "Search EmployeeID...",
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "10px",
      }}
    />
  );
}

export default SearchBar;