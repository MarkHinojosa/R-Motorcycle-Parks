import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default class MapComponent extends Component {
  state = {
    lat: 30,
    lng: -100,
    zoom: 8,
    userLocation: {
      lat: 0,
      lng: 0
    }
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(
        {
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        },
        () => console.log(this.state)
      );
    });
  }

  render() {
    var greenIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon-2x.png",
      iconSize: [25, 41], // size of the icon
      iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
    });

    const position = [this.state.lat, this.state.lng];
    const userLocation = [
      this.state.userLocation.lat,
      this.state.userLocation.lng
    ];
    return (
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={greenIcon} position={userLocation}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}
