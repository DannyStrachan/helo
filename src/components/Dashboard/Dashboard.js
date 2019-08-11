import "./Dashboard.css";
import React, { Component } from "react";
// import Post from '../Post/Post'
// import {Link} from 'react-router-dom'

export default class Dashboard extends Component {
    constructor(props){
        super(props); 

        this.state = {
            checkBox: true, 
            searchBox: '',
            listOfPosts: [
              {
              post_id: 1,
              post_title: 'title1',
              username: 'name1',
              profile_pic: 'https://robohash.org/pic1'
            },{
              post_id: 2,
              post_title: 'title2',
              username: 'name2',
              profile_pic: 'https://robohash.org/pic2'
            },{
              post_id: 3,
              post_title: 'title3',
              username: 'name3',
              profile_pic: 'https://robohash.org/pic3'
            }],
              id: ''
        }
    }

    handleInputChange= (e) => {
      const target = e.target; 
      const value = target.type === 'checkbox' ? target.checked = !this.state.checkBox : target.value;
      const name = target.name; 
      this.setState({
      [name] :value
      }); 
  }


  render() {
    const posts = this.state.listOfPosts.map( (e, i) => {
      return <div key={i} className="post-preview">
        <h2 >{e.post_title}</h2>
        <div className="author">
        <div >{e.username}</div>
        <img className="pic-preview" src={e.profile_pic} alt="" />
        </div>
        </div>
    })

    return (
      
      <div className="dashboard">
        <div className="search">
          <div className="search-bar">
            <input className="search-input" type="text" placeholder="Search By Title" />
            <button className="magnify">Search</button>
            <button className="reset">Reset</button>
          </div>
          <div className="filter">
              <h4 className="my-filter">My Posts</h4>
              <input name='check'type="checkbox" checked={this.state.checkBox} onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="post-list">
        <a href='#/' >{posts}</a>
        </div>
      </div>
    );
  }
}
