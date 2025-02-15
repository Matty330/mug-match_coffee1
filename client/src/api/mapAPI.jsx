import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

export const fetchPlacesData = async (lat, lng) => {
    try {
        if (!API_KEY) {
            throw new Error("No Google Maps API key found");
        }

        const radius = 5000;
        const url = `${PLACES_API_URL}?location=${lat},${lng}&radius=${radius}&type=cafe&key=${API_KEY}`;

        console.log("Fetching URL:", url);

        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            throw new Error(`Invalid map API response (Status: ${response.status})`);
        }

        const data = await response.json();
        console.log("Places Data:", data);
        return data.results;
    } catch (err) {
        console.error(`Error fetching places:`, err.message);
        return []; 
    }
};

export const MapAPIComponent = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const data = await fetchPlacesData(35.01450383964073, -80.68398155147818);
                if (data.length === 0) {
                    setError("No cafes found nearby.");
                } else {
                    setPlaces(data);
                    setLoading(false);
                }
            } catch (err) {
                setError("Failed to fetch places.");
                setLoading(false);
            }
        };
        fetchPlaces();
    }, []);

    return (
        <div>
            <h1>Nearby Cafés</h1>
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <div style={{ height: "400px", width: "100%" }}>
                    <LoadScript googleMapsApiKey={API_KEY}>
                        <GoogleMap
                            mapContainerStyle={{ width: "100%", height: "100%" }}
                            center={{ lat: 35.01450383964073, lng: -80.68398155147818 }}
                            zoom={15}
                        >
                            {places.map((place) => (
                                <Marker
                                    key={place.place_id}
                                    position={{
                                        lat: place.geometry.location.lat,
                                        lng: place.geometry.location.lng,
                                    }}
                                    title={place.name}
                                />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                    <ul>
                        {places.map((place) => (
                            <li key={place.place_id}>
                                <h2>{place.name}</h2>
                                <p>{place.vicinity}</p>
                                <p>Rating: {place.rating || "No rating"}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
