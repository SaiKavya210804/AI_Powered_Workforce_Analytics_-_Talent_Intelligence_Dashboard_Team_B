import { createTheme } from "@mui/material/styles";


const theme = createTheme({

    palette: {

        primary: {
            main: "#2563eb"
        },

        secondary: {
            main: "#7c3aed"
        },

        background: {

            default:"#f8fafc",

            paper:"#ffffff"

        }

    },


    typography: {

        fontFamily:
        "Inter, Roboto, Arial, sans-serif",

    }

});


export default theme;