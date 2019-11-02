import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "../../styling/styles.css";
import { Card, Button, Form } from "react-bootstrap";
import Axios from "axios";
import CustomMarker from "../CustomMarker";

export default class MapComponent extends Component {
  state = {
    zoom: 3,
    haveUsersLocation: false,
    userLocation: {
      lat: 0,
      lng: 0
    },
    cardDetails: {},
    parks: []
  };

  async componentDidMount() {
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

  getParkData = () => {
    Axios.get(
      `http://localhost:${process.env.REACT_APP_PORT}/api/submission`
    ).then(res => {
      this.setState(
        {
          parks: res.data
        },
        () => console.log(this.state)
      );
    });
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

  showParks = () => {
    return this.state.parks.map((curr, ind) => {
      let configureCoordinates = {
        lng: curr.coordinates[1],
        lat: curr.coordinates[0]
      };

      return (
        <CustomMarker
          key={ind}
          iconColor={"blue"}
          position={configureCoordinates}
        />
      );
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

        <CustomMarker
          iconColor={"red"}
          key={"usersLocation"}
          position={this.state.userLocation}
        />
        {this.showParks()}
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
