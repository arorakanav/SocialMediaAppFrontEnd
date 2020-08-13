import React, { Component } from "react";

export default class TwitterFeed extends Component {

  componentDidMount() {
    fetch("http://localhost:4000/feed/twitter", {
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
          twitterFeed: responseJson.twitterFeed
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
    var twitterFeed = this.state && this.state.twitterFeed || []
    var items = []
    for(const tweet of twitterFeed) {
      items.push(<div class="tweet"> 
        <span class="username">@{tweet.user.screen_name}</span>
        <span></span>
        <span class="text">{tweet.text}</span>
      </div>)
    }
    return (
        <div className="feed-container">
          <span className="page-title">Twitter Feed</span>
          <div className="input-container">
            <input type="text" onChange={this.updateInputValue} value={this.state && this.state.tweet}></input>
            <button  onClick={this.postTweet}>Tweet</button>
          </div>
          <div className="feed">
            {items}
          </div>         
        </div>
    );
  }
  updateInputValue = (evt) => {
    this.setState({
      tweet: evt.target.value
    })
  }

  postTweet = () => {
    fetch("http://localhost:4000/feed/tweet", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ message: this.state.tweet }),
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
          twitterFeed: [responseJson.tweet, ...this.state.twitterFeed],
          tweet: ''
        });
        
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }
}