import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContext';
import { DarkModeProvider } from './DarkModeContext';
import { themes } from './theme';
import './axios';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import ChannelPage from './pages/ChannelPage';
import DmPage from './pages/DmPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SearchPage from './pages/SearchPage';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';


// export class DarkMode extends React.Component {
//   // State also contains the updater function so it will
//   // be passed down into the context provider
//   state = {
//     theme: false,
//     isDark: false
//   };
//   toggleTheme = (e) => {
//     console.log('hello');
//     console.log(e);
//     console.log(this.state);
//     this.setState({ isDark: true, theme: true});
//   };
// }



function App() {
  document.title = 'UNSW Memes';
  // Get theme from user OS
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [authDetails, setAuthDetails] = React.useState(localStorage.getItem('token'));
  localStorage.setItem('darkMode', prefersDarkMode);
  // Set Theme here
  const [windowTheme, setWindowTheme] = useState({
    isDark: prefersDarkMode,
    theme: themes.light,
    switchTheme
  });
  function switchTheme () {
    setWindowTheme((prevState) => ({
      theme: prevState.isDark ? themes.dark : themes.light,
      isDark: !prevState.isDark,
      switchTheme,
    }));
  }
  // -------------------------------------------------------------
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: windowTheme.isDark ? 'dark' : 'light',
          theme: windowTheme.isDark ? themes.dark : themes.light
        },
      }),
    [windowTheme],
  );

  function setAuth(token, uId) {
    localStorage.setItem('token', token);
    localStorage.setItem('uId', uId);
    setAuthDetails(token);
  }
  return (
      <AuthProvider value={authDetails}>
        <DarkModeProvider value={windowTheme}>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
          <Router>
            <Switch>
              <Route
                  exact
                  path="/login"
                  render={props => {
                    return <LoginPage {...props} setAuth={setAuth}/>;
                  }}
              />
              <Route
                  exact
                  path="/register"
                  render={props => {
                    return <RegisterPage {...props} setAuth={setAuth}/>;
                  }}
              />
              <Route exact path="/forgot_password" component={ForgotPasswordPage}/>
              <Route exact path="/reset_password" component={ResetPasswordPage}/>
              <ProtectedRoute exact path="/" component={HomePage}/>
              <ProtectedRoute path="/profile/:profile" component={ProfilePage}/>
              <ProtectedRoute path="/channel/:channelId" component={ChannelPage}/>
              <ProtectedRoute path="/dm/:dmId" component={DmPage}/>
              <ProtectedRoute path="/search/:queryStr" component={SearchPage}/>
              <ProtectedRoute path="/search" component={SearchPage}/>
            </Switch>
          </Router>
        </ThemeProvider>
        </DarkModeProvider>
      </AuthProvider>
  );
}

export default App;
