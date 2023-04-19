import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContext';
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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  document.title = 'UNSW Memes';
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [authDetails, setAuthDetails] = React.useState(localStorage.getItem('token'));
  const [darkMode, setDarkMode] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  function setAuth(token, uId) {
    localStorage.setItem('token', token);
    localStorage.setItem('uId', uId);
    setAuthDetails(token);
  }
  return (
      <AuthProvider value={authDetails}>
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
      </AuthProvider>
  );
}

export default App;
