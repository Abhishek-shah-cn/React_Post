import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Post from "./Post";
import "../Style/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
      offset: 0,
      perPage: 4,
      currentPage: 0,
      currentPosts: [],
    };
  }

  // Call the API By axios----------------------------------------------------------------

  receivedData() {
    function getPage1() {
      return axios.get("http://www.mocky.io/v2/59ac293b100000d60bf9c239");
    }

    function getPage2() {
      return axios.get("http://www.mocky.io/v2/59ac28a9100000ce0bf9c236");
    }

    function getPage3() {
      return axios.get("http://www.mocky.io/v2/59b3f0b0100000e30b236b7e");
    }

    let allPostsDetails = [];

    //   Get all three api in getPage1(), getPage2(), getPage3()

    Promise.all([getPage1(), getPage2(), getPage3()]).then((results) => {
      const pageOneResult = results[0];
      const pageTwoResult = results[1];
      const pageThreeResult = results[2];
      // merged all response in single array
      allPostsDetails = [
        ...pageOneResult.data.posts,
        ...pageTwoResult.data.posts,
        ...pageThreeResult.data.posts,
      ];

      const data = allPostsDetails;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((pd) => <Post data={pd}></Post>);
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        postData,
        currentPosts: slice,
        loading: false,
      });
    });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  // General Function for Sorting based on the argument passed
  sortDate = (sort_param) => {
    const postslist = this.state.currentPosts;
    this.setState({
      postData: postslist
        .sort((a, b) => a[sort_param] - b[sort_param])
        .map((pd) => <Post data={pd}></Post>),
    });
  };

  componentDidMount() {
    this.receivedData();
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading . . . </div>
        ) : (
          <div id="main-container">
            <div>
              <button
                className="sortbttn"
                onClick={() => this.sortDate("event_date")}
              >
                Sort By Date
              </button>
            </div>

            <div className="postList">{this.state.postData}</div>

            <div>
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
