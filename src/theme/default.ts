import { createTheme } from "@mui/material/styles";
import { deepPurple, amber, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: deepPurple[300],
      contrastText: "#ffffff"
    },
    secondary: {
      main: amber[400],
    },
    background: {
      default: "#2a223a",
      paper: "#3f2b56"
    },
    text: {
      primary: grey[100],
      secondary: grey[400],
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#3f2b56',
          boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
          color: "#ffffff"
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff"
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#3f2b56",
          boxShadow: "0 2px 4px rgba(0,0,0,0.6)"
        }
      }
    }
  }
});

export default theme;