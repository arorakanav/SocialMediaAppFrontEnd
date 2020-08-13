import React, { Component } from "react";

export default class FacebookFeed extends Component {

  componentDidMount() {
    fetch("http://localhost:4000/feed/facebook", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          facebookFeed: responseJson.facebookFeed
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    var facebookFeed = this.state && this.state.facebookFeed || []
    var items = []
    for(const post of facebookFeed) {
      items.push(<div class="post"> 
        <span class="post-page-details">Positio</span>
        <span class="post-message">{post.message}</span>
      </div>)
    }
    return (
      <div className="feed-container">
        <span className="page-title">Facebook Feed</span>
        <div className="input-container">
          <input type="text" onChange={this.updateInputValue} value={this.state && this.state.post}></input>
          <button  onClick={this.postAccount}>Post</button>
        </div>
        <div className="feed">
          {items}
        </div>         
      </div>
    );
  }
  updateInputValue = (evt) => {
    this.setState({
      post: evt.target.value
    })
  }

  postAccount = () => {
    fetch("http://localhost:4000/feed/postFacebook", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ message: this.state.post }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          facebookFeed: [responseJson.post, ...this.state.facebookFeed],
          post: ''
        });
        
      })
      .catch(error => {
        this.setState({
          error: "Failed to authenticate user"
        });
      });
  }

}