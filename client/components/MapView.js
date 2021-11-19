// https://mariestarck.com/how-to-display-a-mapbox-map-and-geocoder-mapbox-react-tutorial-part-1/

import React, { useCallback, useRef, useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import MarkersList from './MarkersList';
import SearchBar from './SearchBar';
// import boiseList from './PropertyTestData/boiseList';

const mapboxApiKey = process.env.MAPBOX_API_KEY;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const MapView = ({ isLoggedIn }) => {
  /** Marker data should look like this:
  {
    "properties": {
      "Street address": "",
      "City": "",
      "State": "",
      "Zip code": "",
      "Address": "",
      "Price": "",
      "Interest rate": 0,
      "Type": "",
      "Size": "",
      "# bedrooms": 0,
      "# bathrooms": 0,
      "Est. monthly mortgage": 0,
      "Rent array": "",
      "Est. monthly rent": "",
      "Price-to-rent ratio": "",
      "Rating": "",
      "Image": "",
      "ZPID": 0
    },
    "geometry": {
      "coordinates": [
        0,
        0
      ],
      "type": "Point"
    }
  }
  */
  const [ status, setStatus ] = useState(null);
  const [ markers, setMarkers ] = useState({});

  useEffect(() => {
    const defaultLocation = 'Mountain View, CA';
    const fetchMarkers = async () => {
      // update API call status
      setStatus('loading');
      try {
        const res = await fetch(`/api/properties?location=${defaultLocation}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          }
        });

        const results = await res.json();
        setMarkers(results);
        // setMarkers(boiseList);

        // update API call status
        setStatus('done');
      } catch (err) {
        console.error(`fetchMarkers call failed ${err}`);
        // update API call status
        setStatus('error');
      }
    };
    fetchMarkers();
  }, []);

  const classes = useStyles('');

  const mapRef = useRef();
  const geocoderContainerRef = useRef();

  const mapStyle = {
    width: '100%',
    height: 600
  };

  const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
  };

  const [ viewport, setViewport ] = useState({
    // default location - Mountain View, CA
    longitude: -122.08200104737605,
    latitude: 37.38560001105436,
    zoom: 12,
    bearing: 0,
    pitch: 0
  });

  const [ addressCoordinates, setAddressCoordinates ] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 0
  });

  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
    // save coordinate to reverse lookup address by coordinates
    setAddressCoordinates(newViewport);
  }, []);

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [ handleViewportChange ]
  );

  return (
    <Container>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>

          <ReactMapGL
            ref={mapRef}
            mapboxApiAccessToken={mapboxApiKey}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            {...viewport}
            {...mapStyle}
            onViewportChange={handleViewportChange}
          >
            <MarkersList markers={markers} status={status} isLoggedIn={isLoggedIn} />

            <div style={navStyle}>
              <NavigationControl />
            </div>

            <SearchBar
              mapRef={mapRef}
              geocoderContainerRef={geocoderContainerRef}
              mapboxApiKey={mapboxApiKey}
              handleGeocoderViewportChange={handleGeocoderViewportChange}
              setMarkers={setMarkers}
            />
          </ReactMapGL>
        </Grid>
      </div>
      {/* <div>
        <Paper className={classes.paper}>
          xs=12 lat: {viewport.latitude} <br />
          lng: {viewport.longitude} <br />
          zoom: {viewport.zoom}
        </Paper>
      </div> */}
    </Container>
  );
};

export default MapView;
