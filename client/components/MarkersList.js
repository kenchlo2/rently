import React, { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import Pin from './Pin';
import MapModal from './MapModal';
import Spinner from './Spinner';
import api from '../axios/axios';
// import boiseList from './PropertyTestData/boiseList';

const MarkersList = (props) => {
  const { status, markers } = props;
  let features = [];
  let singleLocation = {};

  // set up state to toggle Popup
  const [ MapModalOpen, setMapModalOpen ] = useState(false);

  if (status === 'done') {
    // use case - general area search
    // e.g. Mountain View, CA
    if (markers.propertiesForSale) {
      features = markers.propertiesForSale.features;
    }
    // use case - a specific location search
    // 190 E 72nd St APT 11B, New York, NY 10021
    else if (markers.targetForSale) {
      singleLocation = markers.targetForSale.features;
      features = singleLocation;
      if (markers.propertiesForRental) {
        features = features.concat(markers.propertiesForRental.features);
      }
    }
  }

  console.log('propertiesForRental ', markers.propertiesForRental);
  console.log('singleLocation ', singleLocation);
  console.log('features ', features);
  // features = boiseList.propertiesForSale.features;

  // state to hold specific property details when a pin on the map is clicked.
  // details will be displayed on modal and saved to mongodb if fav added
  const [ propDetail, setPropDetail ] = useState({});

  // second api call to get rent data and rating on specific address
  const getDetails = async (e, feature) => {
    // console.log('clicked property:');
    // console.log(feature);
    if (markers.propertiesForSale) {
      const res = await api.post('/properties/target', null, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        params: {
          location: feature['properties']['Address'],
          home_type: feature['properties'].Type,
          beds: feature['properties']['# bedrooms'],
          baths: feature['properties']['# bathrooms'],
          Price: feature['properties'].Price,
          ZPID: feature['properties'].ZPID
        }
      });
      // console.log(JSON.stringify(res.data.targetForSale, null, 2));
      Object.assign(feature.properties, res.data.targetForSale.features[0].properties);
      setPropDetail(feature);
      console.log('PROP DETAIL', propDetail);
      setMapModalOpen(true);
    } else {
      setPropDetail(feature);
      setMapModalOpen(true);
    }
  };

  // open / close handlers for modal
  const handleOpen = (e, idx) => {
    e.preventDefault();
    getDetails(e, features[idx]);
  };

  const handleClose = () => {
    setMapModalOpen(false);
  };

  let content;

  if (status === 'loading') {
    content = <Spinner />;
  } else if (status === 'done') {
    content = features.map((marker, idx) => (
      <Marker
        key={idx}
        id={idx}
        longitude={Number(marker.geometry.coordinates[0])}
        latitude={Number(marker.geometry.coordinates[1])}
        onClick={(e) => handleOpen(e, idx)}
      >
        <Pin
          color={markers.targetForSale && idx === 0 ? 'green' : '#f7786b'}
          size={markers.targetForSale && idx === 0 ? 35 : 20}
        />
      </Marker>
    ));
    console.log(content)
  } else if (status === 'error') {
    content = <div>{status}</div>;
  }

  return (
    <div>
      {content}
      {MapModalOpen && (
        <MapModal
          open={MapModalOpen}
          handleClose={handleClose}
          prop={propDetail}
        />
      )}
    </div>
  );
};

export default MarkersList;
