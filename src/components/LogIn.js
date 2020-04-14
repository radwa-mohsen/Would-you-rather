import React, { Component } from "react";
import { connect } from "react-redux";

class LogIn extends Component {
  render() {
    return (
      <div>
        <h3>Log In Page</h3>
      </div>
    );
  }
}

export default connect()(LogIn);
