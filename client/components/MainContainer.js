import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
// import Card from '@material-ui/core/Card';
// import SearchBar from './SearchBar';
import NavBar from './NavBar';
import MapView from './MapView';

const MainContainer = ({ isLoggedIn, setIsLoggedIn, darkState, setDarkState, handleThemeChange }) => {
  return (
    <>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        darkState={darkState}
        setDarkState={setDarkState}
        handleThemeChange={handleThemeChange}
      />
      <Container component="main">
        <Container>
          <Box>
            <MapView isLoggedIn={isLoggedIn} />
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default MainContainer;
