import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import api from '../axios/axios';
import NavBar from './NavBar';
import FavModal from './FavsModal';

// Favorite array state set by get request in component fxn

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    minWidth: 500,
    width: 900,
    height: 'auto'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  },
  header: {
    fontSize: '2em'
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function TitlebarGridList({ isLoggedIn, setIsLoggedIn, darkState, setDarkState, handleThemeChange }) {
  const classes = useStyles();
  const [tileData, setTileData] = useState([]);
  const [propDetail, setPropDetail] = useState({});
  const [gotFavs, setGotFavs] = useState(false);
  const [favDetailsOpen, setFavDetailsOpen] = useState(false);
  // open/close handlers for prop detail modal
  const handleOpen = (e, idx) => {
    e.preventDefault();
    setPropDetail(tileData[idx]);
    setFavDetailsOpen(true);
  };

  const handleClose = () => {
    setFavDetailsOpen(false);
  };

  //get request to retrieve favorites
  const getFavs = async () => {
    await api({
      method: 'post',
      url: '/getFavs'
    })
      .then((res) => {
        setTileData(res.data.favsArr);
        setGotFavs(true);
      })
      .catch((err) => {
        console.log('GET FAVS ERROR ', err.message);
      });
  };

  useEffect(() => {
    if (isLoggedIn) getFavs();
  }, []);

  return (
    <div>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        darkState={darkState}
        setDarkState={setDarkState}
        handleThemeChange={handleThemeChange}
      />
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div" className={classes.header}>
              Favorites
            </ListSubheader>
          </GridListTile>
          {isLoggedIn && gotFavs &&
            tileData.map((tile, idx) => (
              <GridListTile key={tile.Image} idx={idx}>
                <img src={tile.Image} alt={tile.Address} />

                <GridListTileBar
                  title={tile.Address}
                  idx={idx}
                  subtitle={
                    <span>
                      Price: {tile.Price}
                      <br /> Investment Rating: {tile.Rating}
                    </span>
                  }
                  actionIcon={
                    <IconButton
                      idx={idx}
                      aria-label={`info about ${tile.address}`}
                      className={classes.icon}
                      onClick={(e) => {
                        handleOpen(e, idx);
                      }}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
        </GridList>
      </div>
      <FavModal
        prop={propDetail}
        open={favDetailsOpen}
        handleClose={handleClose}
      />
    </div>
  );
}

export default TitlebarGridList;
