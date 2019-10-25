import React, { Component } from "react";
// import "./main.css";
import MapComponent from "../components/map";
import "../styling/styles.css";

export default class main extends Component {
  render() {
    return (
      <div className="main">
        <MapComponent />
      </div>
    );
  }
}
