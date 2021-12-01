import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
// import Card from '@material-ui/core/Card';
// import SearchBar from './SearchBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavBar from './NavBar';
import MapView from './MapView';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="right">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' by '}
      <Link color="inherit" href="https://github.com/kenchlo2/rently#readme">
        kenchlo2
      </Link>
    </Typography>
  );
}

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
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default MainContainer;
