import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#6b6b6b',
      // contrastText: will be calculated to contrast with palette.primary.main
      contrastText: "#fff"
    },
    secondary: {
      // light: will be calculated from palette.secondary.main,
      main: '#ee1c24',
      // contrastText: will be calculated to contrast with palette.secondary.main
      contrastText: "#fff"
    },
    error: {
      //   light:
      main: "#C0392B"
    }
  }
});
