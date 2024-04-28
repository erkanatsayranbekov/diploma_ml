import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#111a2e",
      light: "#eb7350",
      border1: grey[300],
    },
    text: {
      invert: "#f8f8f8",
    },
  },
});

export default theme;
