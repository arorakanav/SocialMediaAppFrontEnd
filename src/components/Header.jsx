import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Header extends Component {
  static propTypes = {
    // authenticated: PropTypes.bool.isRequired, 
    user: PropTypes.bool.isRequired
  };

  render() {
    const { user } = this.props;
    return (
      <div class="App-header">
        <div style={{ display: "flex" }}>
          { user && user.twitterId &&
            <span class="header-item" onClick={this.props.showTwitter}>TwitterFeed</span>
          }
          { user && user.facebookId &&
            <span class="header-item" onClick={this.props.showFacebook}>FacebookFeed</span>
          }  
        </div>
        <div className="margin-left-auto">
            { user && !user.twitterId &&
              <span class="header-item" onClick={this._handleSignInTWClick}>LoginTWitter</span>
            }
            { user && !user.facebookId &&
              <span class="header-item" onClick={this._handleSignInFBClick}>LoginFacebook</span>  
            }
            <span class="header-item" onClick={this._handleLogoutClick}>Logout</span>
        </div>
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

  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage component
    window.open("http://localhost:4000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };

}