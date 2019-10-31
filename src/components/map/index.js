import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "../../styling/styles.css";
import { Card, Button, Form } from "react-bootstrap";
import Axios from "axios";

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
    },
    cardDetails: {}
  };

  async componentDidMount() {
    console.log(process.env);
    this.getParkData();
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

  getParkData = () => {
    Axios.get(
      `http://localhost:${process.env.REACT_APP_PORT}/api/submission`
    ).then(res => console.log(res));
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.cardDetails);
  };

  handleTextChange = event => {
    this.setState({
      cardDetails: {
        ...this.state.cardDetails,
        [event.target.name]: event.target.value
      }
    });
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
          <Card.Body>
            <Card.Title>share a riding trail!</Card.Title>
            {/* form begins here */}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Name of trail</Form.Label>
                <Form.Control
                  name="name"
                  onChange={this.handleTextChange}
                  placeholder="Enter name of trail"
                  as="textarea"
                  rows="1"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Notes about this trail</Form.Label>
                <Form.Control
                  name="notes"
                  onChange={this.handleTextChange}
                  placeholder="Enter notes"
                  as="textarea"
                  rows="3"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={!this.state.haveUsersLocation}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Map>
    );
  }
}
