import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';


const lightTheme = {
  primary: {
    main: '#556cd6',
  },
  secondary: {
    main: '#19857b',
  },
  error: {
    main: red.A400,
  },
  background: {
    default: '#fff',
  },
}
const darkTheme = {
  primary: {
    main: '#23368f',
  },
  secondary: {
    main: '#5f93d8',
  },
  error: {
    main: red.A400,
  },
  background: {
    default: '#131516',
  },
  color: '#FFFFFF'
}

// A custom theme for this app
const theme = createTheme({
  palette: darkTheme
});

export default theme;
