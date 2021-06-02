import React, { Component } from "react";
import "../Style/index.css";

class Post extends Component {
  constructor(props) {
    super(props);
    console.log("Post", props.data.views);
  }

  render() {
    return (

      //Received Props & Rendring the data 
      <div>
        <div className="card-box">
          <img
            src={this.props.data.thumbnail_image}
            alt={this.props.data.thumbnail_image.alt}
          />

          <div className="details">
            <h4> {this.props.data.event_name} </h4>

            <span className="date">🔀 {this.props.data.shares}</span>
          </div>
          <div className="icon">
            <div className="icon-text">
              {" "}
              ❤️ <p> {this.props.data.likes} Likes</p>
            </div>

            <div className="icon-text">
              {" "}
              👀<p> {this.props.data.views} Likes</p>
            </div>
          </div>
          <p> {this.props.data.event_date}</p>
        </div>
      </div>
    );
  }
}

export default Post;
