import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "../../styling/styles.css";
import { Card, Button } from "react-bootstrap";

const pinIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon-2x.png",
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
});

export default class MapComponent extends Component {
  state = {
    zoom: 3,
    haveUsersLocation: false,
    userLocation: {
      lat: 0,
      lng: 0
    }
  };

  async componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          zoom: 14,
          haveUsersLocation: true,
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      err => console.log(err)
    );
  }

  displayMarker = () => {
    return this.state.haveUsersLocation ? (
      <Marker icon={pinIcon} position={this.state.userLocation}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    ) : null;
  };

  render() {
    return (
      <Map
        className="Map"
        center={this.state.userLocation}
        zoom={this.state.zoom}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.displayMarker()}
        <Card className="message-form">
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Map>
    );
  }
}
