import React, { useState, useEffect } from 'react';
import SignIn from './components/Signin';
import MainContainer from './components/MainContainer';
import Register from './components/Register';
import Favorites from './components/Favorites';
// import NavBar from './components/NavBar';
// import Test from './components/Test';

import { Switch, Route, Redirect } from 'react-router-dom';
// import MapView from './MapView';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import api from './axios/axios';

const App = () => {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogIn = async () => {
    await api({
      method: 'get',
      url: '/isLoggedIn'
    }).then((res) => {
      console.log('/isLoggedIn: ' + res.data.isLoggedIn);
      if (res.data.isLoggedIn) setIsLoggedIn(true);
    })
  };

  useEffect(() => {
    checkLogIn();
  });

  const handleThemeChange = () => {
    setDarkState(! darkState);
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="router">
        <main>
          <Switch>
            <Route exact path="/rently">
              {/* <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                darkState={darkState}
                setDarkState={setDarkState}
                handleThemeChange={handleThemeChange}
              /> */}
              <MainContainer
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                darkState={darkState}
                setDarkState={setDarkState}
                handleThemeChange={handleThemeChange}
              />
            </Route>
            <Route exact path="/rently/signin">
              <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>

            <Route exact path="/rently/register">
              <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route exact path="/rently/favs">
              {/* <NavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                darkState={darkState}
                setDarkState={setDarkState}
                handleThemeChange={handleThemeChange}
              /> */}
              <Favorites
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                darkState={darkState}
                setDarkState={setDarkState}
                handleThemeChange={handleThemeChange}
              />
            </Route>
          </Switch>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
