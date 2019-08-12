import "./Dashboard.css";
import React, { Component } from "react";
import axios from "axios";
// import store from '../../ducks/store'
// import Post from '../Post/Post'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { setPost, clearEntries } from "../../ducks/reducer"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // const reduxState = store.getState()
    this.state = {
      checkBox: props.checkBox,
      searchBox: props.searchBox,
      listOfPosts: props.listOfPosts,
      id: props.id
    };
  }
  

  componentDidMount = () => {
    // store.subscribe(() => {
    //   store.getState()
    // })
    this.getPostings(); 
  }

  resetSearch = async () => {
    console.log('hit reset');
    // await this.props.clearEntries()
    await this.setState({
    

      checkBox: true,
      searchBox: ""
    })
    // store.subscribe(() => {
    //   store.getState()
    // })
    // this.setState({
    //   searchBox: ""
    // })
    this.getPostings()
  }

  handleInputChange = e => {
    // console.log('state in this.state.searchBox:', this.state.searchBox);

    const target = e.target;
    const value =
      target.type === "checkbox" ? !this.state.checkBox : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  getPostings = async () => {
    console.log('hit get postings');
    const { checkBox, searchBox } = this.state
    await axios.get(
      `/api/posts/allPosts?userposts=${checkBox}&search=${searchBox}`)
      .then(res => {
      this.setState({
        listOfPosts: res.data,
        searchBox: ""
      })
      console.log("getting your listings", res.data)
    })
  };

  render() {
    console.log('this is this props:', this.props);
    const posts = this.state.listOfPosts.map((e, i) => {
      return (
        <div key={i} className="post-preview">
          <h2>{e.title}</h2>
          <div className="author">
            <div>{e.username}</div>
            <img className="pic-preview" src={e.profile_pic} alt="" />
          </div>
        </div>
      );
    });

    return (
      <div className="dashboard">
        <div className="search">
          <div className="search-bar">
            <input
              className="search-input"
              type="text" 
              name="searchBox" 
              placeholder="Search By Title" 
              value={this.state.searchBox}
              onChange={e => this.handleInputChange(e)}
            />
            <button className="magnify" onClick={this.getPostings} >Search</button>
            <button className="reset" onClick={this.resetSearch} >Reset</button>
          </div>
          <div className="filter">
            <h4 className="my-filter">My Posts</h4>
            <input
              name="checkBox"
              value={this.state.checkBox}
              type="checkbox"
              checked={this.state.checkBox}
              onChange={e => this.handleInputChange(e)}
            />
          </div>
        </div>
        <div className="post-list">
          <a href="#/">{posts}</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { checkBox, searchBox, listOfPosts, id } = reduxState;
  return { checkBox, searchBox, listOfPosts, id };
}

export default connect(
  mapStateToProps,
  { setPost, clearEntries }
)(withRouter(Dashboard));

// #parent{
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
// }

// #child{
//   width: 100%;
//   height: 100%;
//   overflow-y: scroll;
//   padding-right: 17px; /* Increase/decrease this value for cross-browser compatibility */
//   box-sizing: content-box; /* So the width will be 100% + 17px */
// }

// const postArrayTest =
// [
//   {
//   post_id: 1,
//   post_title: 'title1',
//   username: 'name1',
//   profile_pic: 'https://robohash.org/pic1'
// },{
//   post_id: 2,
//   post_title: 'title2',
//   username: 'name2',
//   profile_pic: 'https://robohash.org/pic2'
// },{
//   post_id: 3,
//   post_title: 'title3',
//   username: 'name3',
//   profile_pic: 'https://robohash.org/pic3'
// }]
