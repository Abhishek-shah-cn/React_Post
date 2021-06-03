import React, { Component } from "react";
import "../Style/index.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      //Received Props & Rendring the data
      <div
        id="post-card"
        onClick={() =>
          this.setState({
            isOpen: !this.state.isOpen,
          })
        }
      >
        <div className="card-box">
          <img src={this.props.data.thumbnail_image} alt="img" />

          <div className="details">
            <h1> {this.props.data.event_name} </h1>

            
          </div>
          <div className="icon">
            <div className="icon-text">
              {" "}
              ❤️ <p> {this.props.data.likes} Likes</p>
            </div>

            <div className="icon-text">
              {" "}
              👀<p> {this.props.data.views} Views</p>
            </div>
            <span className="date">🔀 <p>{this.props.data.shares}</p></span>
          </div>
          <p> {new Date(this.props.data.event_date).toDateString()}</p>
        </div>

        <div className="belowup" style={{ display: this.state.isOpen ? "block" : "none" }}>
          <p >Total 👍{this.props.data.likes}</p>
          <p>Created Date 📆 :- {new Date(this.props.data.event_date).toDateString()}</p>
        </div>
      </div>
    );
  }
}

export default Post;
