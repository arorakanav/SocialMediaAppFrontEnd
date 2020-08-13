import React, { Component } from "react";

export default class Login extends Component {

  render() {
    return (
          <div className="login-page">
            <div>
              <span className="login-header">Welcome Sign-in using:</span>
            </div>
            <div className="login-twitter" onClick={this._handleSignInTWClick}>Twitter</div>
            <div className="login-facebook" onClick={this._handleSignInFBClick}>Facebook</div>  
          </div>         
    );
  }

  _handleSignInTWClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open("http://localhost:4000/auth/twitter", "_self");
  };

  _handleSignInFBClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open("http://localhost:4000/auth/facebook", "_self");
  };
}