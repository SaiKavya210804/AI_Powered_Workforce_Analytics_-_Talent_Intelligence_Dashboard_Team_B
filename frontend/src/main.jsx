import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import "./styles/layout.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
ReactDOM.createRoot(
    document.getElementById("root")
)
.render(

    <ThemeProvider theme={theme}>

        <BrowserRouter>

            <App />

        </BrowserRouter>

    </ThemeProvider>

);
  </StrictMode>
);