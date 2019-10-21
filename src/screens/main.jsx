import React, { Component } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import Map from "./map";

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
        <Map />
      </div>
    );
  }
}
