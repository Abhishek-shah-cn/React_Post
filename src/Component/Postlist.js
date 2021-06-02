import React, { Component } from "react";
import Post from "./Post";

class Postlist extends Component {
  render() {
    return (
      // Send Props to Post
      this.props.posts.map((post) => <Post data={post}></Post>)
    );
  }
}

export default Postlist;
