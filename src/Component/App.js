import React, { Component } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Postlist from "./Postlist";
import "../Style/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
      offest: 0,
    };
  }

  // Call the API By axios----------------------------------------------------------------

  componentDidMount() {
    function getPage1() {
      return axios.get("http://www.mocky.io/v2/59ac293b100000d60bf9c239");
    }

    function getPage2() {
      return axios.get("http://www.mocky.io/v2/59ac28a9100000ce0bf9c236");
    }

    function getPage3() {
      return axios.get("http://www.mocky.io/v2/59b3f0b0100000e30b236b7e");
    }

    //   Get all three api in getPage1(), getPage2(), getPage3()

    Promise.all([getPage1(), getPage2(), getPage3()]).then((results) => {
      const pageOneResult = results[0];
      const pageTwoResult = results[1];
      const pageThreeResult = results[2];
      console.log("result", pageOneResult, pageTwoResult, pageThreeResult);
      // merged all response in single array
      let allPostsDetails = [
        ...pageOneResult.data.posts,
        ...pageTwoResult.data.posts,
        ...pageThreeResult.data.posts,
      ];
      console.log("allPostsDetails", allPostsDetails);
      this.setState({
        posts: allPostsDetails,
        loading: false,
      });
    });
  }

  // This function is not working right now
  handlePageClick = (data) => {
    let selected = data;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset });
  };

  sortDate = () => {
    console.log("Sorting----", this.state.posts);
    // const { list } = this.props;
    // list.sort((product1, product2) => product1.price - product2.price);
    // this.setState({ list: list });
    const { postslist } = this.state.posts;
    // let newPostlist = Postlist.reverse()
    this.setState({
      post: postslist.sort((a, b) => a.date > b.date),
    });
  };

  render() {
    return (
      <div>
        <header className="App-header">
          {this.state.loading ? (
            <div>Loading . . . </div>
          ) : (
            <div>
              <div>
                <button className="sortbttn" onClick={this.sortDate}>
                  Sort By Date
                </button>
              </div>
              <Postlist
                className="commentBox"
                posts={this.state.posts}
              ></Postlist>
              {/* Pagination is Given but not active currently */}
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
