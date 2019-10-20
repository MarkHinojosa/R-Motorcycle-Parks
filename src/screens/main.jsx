import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 12, lng: 12 }}
    ></GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(map));

export default class Main extends Component {
  render() {
    return (
      <div style={{ height: "100vw", borderColor: "red", borderWidth: 10 }}>
        <WrappedMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}
