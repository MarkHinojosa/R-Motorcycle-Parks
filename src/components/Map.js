import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "../styling/styles.css";
import Axios from "axios";
import CustomMarker from "./CustomMarker";
import FloatingCard from "./FloatingCard";

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
      this.setState({
        parks: res.data
      });
    });
  };

  showParks = () => {
    return this.state.parks.map((curr, ind) => {
      let configureCoordinates = {
        lng: curr.coordinates[0],
        lat: curr.coordinates[1]
      };

      return (
        <CustomMarker
          key={ind}
          iconColor={"blue"}
          position={configureCoordinates}
          notes={curr.details}
          trailName={curr.trailName}
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
        <FloatingCard
          coordinates={this.state.userLocation}
          haveUsersLocation={this.state.haveUsersLocation}
        />
      </Map>
    );
  }
}
