import React, { useState, useEffect } from "react";
import GradientBackground from "../components/GradientBackground";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { fetchPlacesData } from "../api/mapAPI"; 
import "../index.css";

const CoffeeShops = () => {
    const navigate = useNavigate();
    const [places, setPlaces] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const apiURL = import.meta.env.VITE_GOOGLE_MAP_API_KEY; 

    useEffect(() => {
        const fetchNearbyPlaces = async (retryCount = 0) => {
            try {
                const response = await fetch(apiURL);
                if (!response.ok) throw new Error("Failed to fetch");

                const data = await response.json();
                setPlaces(data);
            } catch (error) {
                console.error("Error fetching places:", error);
                
                
                if (retryCount < 3) {
                    setTimeout(() => fetchNearbyPlaces(retryCount + 1), 1000);
                } else {
                    console.error("Max retries reached.");
                }
            }
        };

        fetchNearbyPlaces();
    }, []);

    const handleSearchCafes = async () => {
        try {
            const data = await fetchPlacesData();
            if (data) {
                setPlaces(data);
            } else {
                console.warn("No cafes found.");
            }
        } catch (error) {
            console.error("Error searching cafes:", error);
        }
    };

    const handlePostCafes = async () => {
        try {
            const newCafe = {
                name: "New Coffee Spot",
                location: "Unknown",
            };
            const response = await fetchPlacesData(newCafe); 
            if (response) {
                setPlaces((prevPlaces) => [...prevPlaces, response]);
            }
        } catch (error) {
            console.error("Error posting a new cafe:", error);
        }
    };

    const containerStyle = {
        width: "100%",
        height: "400px",
    };

    const center = {
        lat: 35.021534,
        lng: -80.688171,
    };

    return (
        <GradientBackground>
            <h1 className="text-center text-2xl font-bold my-4">
                Coffee Shops to Try!
            </h1>

            {places.length > 0 ? (
                <ul className="text-center">
                    {places.map((place, index) => (
                        <li key={index} className="my-2 p-2 border-b">
                            {place.name} - {place.location}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No coffee shops found.</p>
            )}

            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                    onLoad={() => setMapLoaded(true)}
                >
                    {places.map((place, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: place.latitude || center.lat,
                                lng: place.longitude || center.lng,
                            }}
                            label={place.name}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </GradientBackground>
    );
};

export default CoffeeShops;
