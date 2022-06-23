import "./App.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { WeatherComponent } from "./components/WeatherComponent";

const containerStyle = {
  width: "400px",
  height: "900px",
};

type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];
const lib: Libraries = ["places"];

type Coords = {
  lat: number;
  lng: number;
};

const App = () => {
  const [coord, setCoord] = useState<Coords>({ lat: -3.745, lng: -38.523 });

  const handleClickMap = (e: google.maps.MapMouseEvent) => {
    if (null === e.latLng) {
      return;
    }
    setCoord({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD0bbRfywvO5mXNy0MwFYBhymFiTcU1AVk"
      libraries={lib}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coord}
        zoom={10}
        onClick={(e) => handleClickMap(e)}
      ></GoogleMap>
      <WeatherComponent coords={coord} setCoord={setCoord} />
    </LoadScript>
  );
};

export default App;
