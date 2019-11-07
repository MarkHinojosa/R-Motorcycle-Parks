import React, { Component } from "react";
import ReactLoading from "react-loading";

export default class LoadingScreen extends Component {
  render() {
    return (
      <div
        className="loading-indicator"
        style={{ alignContent: "center", justifyContent: "center", flex: 1 }}
      >
        <ReactLoading type={"spokes"} color={"red"} height={100} width={100} />
      </div>
    );
  }
}
