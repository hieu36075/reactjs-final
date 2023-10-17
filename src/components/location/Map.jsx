import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";


const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon
      icon={locationIcon}
      className="pin-icon"
      style={{ fontSize: "30", color: "red" }}
    />
    <p className="pin-text">{text}</p>
  </div>
);

const Map = ({ location, zoomLevel }) => {
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_KEY,
        }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location?.lat}
          lng={location?.lng}
          text={location?.address}
        />
      </GoogleMapReact>
    </>
  );
};

export default Map;