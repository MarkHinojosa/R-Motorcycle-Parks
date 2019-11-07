import React, { Component } from "react";
// import "./main.css";
import MapComponent from "../components/Map.js";
import "../styling/styles.css";
import Loading from "../components/LoadingScreen";

export default class main extends Component {
  render() {
    return (
      <div className="main">
        <MapComponent />
      </div>
    );
  }
}
