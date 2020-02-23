import React, { Component } from "react";
import "./Error.css";

export default class Error extends Component {
  render() {
    return (
      <div>
        <img
          alt="warning"
          className="error-pic"
          src={require("../../imgs/warning.png")}
        />
        <strong className="error">{this.props.message}</strong>
      </div>
    );
  }
}
