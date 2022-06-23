import { useState, useEffect, useRef } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import "./styles.css";
import { WeatherComponentProps } from "./types";
import axios from "axios";
import "../../fonts/LG_Weather_Z.ttf";

export const WeatherComponent = (props: WeatherComponentProps) => {
  const [searchInput, setSearchInput] = useState("");

  const onPlacesChanged = () => {
    if (!searchBox.current) {
      return;
    }
    const place = searchBox.current.getPlaces();

    if (place?.[0].formatted_address !== undefined) {
      setSearchInput(place[0].formatted_address);
    }

    if (place?.[0].geometry?.location === undefined) {
      return;
    }
    props.setCoord({
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng(),
    });
  };

  const getWeather = async () => {
    const coords = props.coords.lat + "," + props.coords.lng;
    const API_KEY = process.env.REACT_APP_APIKEY;
    const link =
      `http://api.weatherapi.com/v1/current.json?days=3&key=${API_KEY}&q=` +
      coords;

    try {
      const response = await axios.get(link);

      setWeather(response.data.current);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoad = (e: google.maps.places.SearchBox) => {
    searchBox.current = e;
    console.log(searchBox.current);
  };

  const [currentWeather, setWeather] = useState<any>(null);

  const searchBox = useRef<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.coords]);

  return (
    <>
      <div
        className={
          currentWeather?.is_day === 1
            ? "weatherContainerDay"
            : "weatherContainerNight"
        }
      >
        <div className="layer">
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              className="searchbar"
              placeholder="Search or click on the map..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setSearchInput("")}
            />
          </StandaloneSearchBox>
          <div className="celciusframe">
            <div className="celcius">
              {isNaN(currentWeather?.feelslike_c)
                ? "-"
                : Math.round(currentWeather?.feelslike_c)}
              &#xb0;
            </div>
          </div>
          <div className="dane">
            <div className="day">
              Forecast
              <hr></hr>
            </div>
          </div>
          <div className="dane2">
            <div className="row1">
              <div>Monday</div>
              <div>Tuesday</div>
              <div>Wednesday</div>
            </div>
            <div className="row2">
              <div>16&#xb0;c</div>
              <div>12&#xb0;c</div>
              <div>14&#xb0;c</div>
            </div>
            <div className="row3">
              <div>
                <img src={currentWeather?.condition.icon} alt="" />
              </div>
              <div>
                <img src={currentWeather?.condition.icon} alt="" />
              </div>
              <div>
                <img src={currentWeather?.condition.icon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
