import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 35.021534,
    lng: -80.688171,
};

const MapComponents = () => {
    return (
        <LoadScript googleMapsApiKey='VITE_TOKEN'>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            >
            </GoogleMap>
        </LoadScript>
    )
}

export default MapComponents;