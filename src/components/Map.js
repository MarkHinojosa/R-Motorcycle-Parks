import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "../styling/styles.css";
import Axios from "axios";
import CustomMarker from "./CustomMarker";
import FloatingCard from "./FloatingCard";
import LoadingIndicator from "./LoadingScreen";

export default class MapComponent extends Component {
  state = {
    zoom: 3,
    haveUsersLocation: false,
    userLocation: {
      lat: 0,
      lng: 0
    },
    cardDetails: {},
    parks: [],
    loading: false
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
          },
          loading: false
        });
      },
      err => console.log(err)
    );
  }

  getParkData = () => {
    this.setState({ loading: true });
    Axios.get(
      `https://guarded-everglades-11833.herokuapp.com/api/submission`
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

  submittingData = () => {
    this.setState({ loading: true });
  };
  submittedData = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <Map
        className="map"
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
          submittedData={this.submittedData}
          submittingData={this.submittingData}
          coordinates={this.state.userLocation}
          haveUsersLocation={this.state.haveUsersLocation}
        />
        {this.state.loading ? <LoadingIndicator /> : null}
      </Map>
    );
  }
}
