type Coords = {
  lat: number;
  lng: number;
};

export type WeatherComponentProps = {
  coords: Coords;
  setCoord: (val: Coords) => void;
};

export type Places = {
  0: {
    geometry: {
      location: {
        lat: () => void;
        lng: () => void;
      };
    };
  };
};
