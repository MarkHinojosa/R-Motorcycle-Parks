import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default class Map extends Component {
  componentDidMount() {
    this.mymap = L.map("mymap", {
      center: [30, -100],
      zoom: 6,
      zoomControl: false
    });
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=" +
        process.env.REACT_APP_MAPBOX_KEY,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: process.env.REACT_APP_MAPBOX_KEY
      }
    ).addTo(this.mymap);
  }

  render() {
    return <Wrapper width="500px" height="500px" id="mymap" />;
  }
}
