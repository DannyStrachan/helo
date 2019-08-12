import "./Dashboard.css";
import React, { Component } from "react";
import axios from "axios";
import store from '../../ducks/reducer'
// import Post from '../Post/Post'
// import {Link} from 'react-router-dom'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState()
    this.state = {
      checkBox: true,
      searchBox: "",
      listOfPosts: [],
      id: reduxState.id
    };
  }

  componentDidMount = (reduxState) => {
    this.setState({
      checkBox: reduxState.checkBox,
      searchBox: reduxState.searchBox,
      listOfPosts: reduxState.listOfPosts,
      id: reduxState.id
    })
    this.getPostings(); 
  }

  resetSearch = () => {
    this.getPostings()
  }

  handleInputChange = e => {
    console.log('state in this.state.searchBox:', this.state.searchBox);

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
    let res = await axios.get(
      `/api/posts/allPosts?userposts=${this.state.checkBox}&search=${
        this.state.searchBox
      }`
    );
    this.setState({
      listOfPosts: res.data
    });
  };

  render() {
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
