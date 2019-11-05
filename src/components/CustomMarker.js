import L from "leaflet";
import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import { bold } from "ansi-colors";

const blueIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon-2x.png",
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
});

const redIcon = L.icon({
  iconUrl: "http://www.clker.com/cliparts/Z/x/U/0/B/3/red-pin-hi.png",
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
});

export default class CustomMarker extends Component {
  render() {
    console.log(this.props);
    return (
      <Marker
        icon={this.props.iconColor === "blue" ? blueIcon : redIcon}
        position={this.props.position}
      >
        <Popup>
          <span style={{ fontWeight: "bold" }}>{this.props.trailName}</span>
          <br />
          {this.props.notes}
        </Popup>
      </Marker>
    );
  }
}
