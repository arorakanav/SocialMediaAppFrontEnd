import React, { Component } from "react";

import Header from "./Header";
import PropTypes from "prop-types";
import TwitterFedd from "./TwitterFeed";
import FacebookFeed from "./FacebookFeed"

export default class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.showFacebook = this.showFacebook.bind(this)
    this.showTwitter = this.showTwitter.bind(this)
  }
  static propTypes = {
    user: PropTypes.bool.isRequired,
  };

  componentDidMount(){
    var user = this.props.user;
    var defaultView = user.twitterId ? 'twitter' : 'facebook'
    this.setState({ selectedView : defaultView})
  }

  render() {
    var  selectedView  = this.state && this.state.selectedView
    return (
          <div>
            <Header 
              user =  {this.props.user}
              handleNotAuthenticated={this.props._handleNotAuthenticated}
              showFacebook={this.showFacebook}
              showTwitter={this.showTwitter}
              >
            </Header>
            <div className="user-detail">
              <span>Welcome </span>
              <span>{ this.props.user.name }</span>
            </div>
            <div>
              { selectedView === 'twitter' && 
                <TwitterFedd></TwitterFedd>
              } 
              { selectedView === 'facebook' && 
                <FacebookFeed></FacebookFeed>
              } 
            </div>
          </div>   
    );
  }
  showFacebook() {
    this.setState({ selectedView: 'facebook' });
  }
  showTwitter() {
    this.setState({ selectedView: 'twitter' });
  }
}

