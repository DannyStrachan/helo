import "./Dashboard.css";
import React, { Component } from "react";
import axios from "axios";
// import store from '../../ducks/store'
// import Post from '../Post/Post'
import {Link} from 'react-router-dom'
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
      id: props.id,
      listOfOtherPost: []
    };
  }
  

  componentDidMount = async () => {
    // store.subscribe(() => {
    //   store.getState()
    // })
    await this.getPostings(); 
    // let filteredPosts = this.state.listOfPosts.filter(post => post.username !== this.props.user.username)
    // this.setState({
    //   listOfOtherPost: filteredPosts
    // })
  }

  async displayId(e) {
    console.log('post Id:', e.target.id);
    console.log('history:', this.props.history);
    this.props.history.push(`/post/{e.target.id}`)
    window.location.href = `http://localhost:3000/#/post/${e.target.id}`
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
    // this.filterUserPosts()
  };

  getPostings = async () => {
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

  filterUserPosts = () => {
    if (this.state.checkBox === true) { this.setState({ listOfPosts: {...this.state.listOfPosts}}) } 
    else {
      const filteredPosts = this.state.listOfPosts.filter(post => post.username !== this.props.user.username)
      this.setState({
        listOfPosts: filteredPosts
      })
    }
  }

  render() {
    console.log('this is state:', this.state);
    // onClick={e => this.displayId(e)}
      const posts = this.state.listOfPosts.map((e, i) => {
        return (
          <Link key={i} to={{ 
            pathname: `/post/${e.post_id}`,
            state: e.post_id }} >
          <div key={i} className="post-preview" >
            <h2 name={e.post_id} id={e.post_id} >{e.title}</h2>
            <div className="author">
              <p>by {e.username}</p>
              <img className="pic-preview" src={e.profile_pic} alt="" />
            </div>
          </div>
          </Link>
        );
      })

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
            <img onClick={this.getPostings} class="dash_search_button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAeJJREFUSA2tlM0rBGEcx3dWEREp4oBVrvsXLJEoTsR/QDk6ydt1E2ccuIniKGeEi4MLbY6SAzaRUt5C1uer9pkZM7PM2m99muf5vT0zz/yeJxLxUSaTKYch2IJzeIF7SMECdPikeUzWTwuJI9iSUA0HcAhpKIVm6IEWkG/UsqwUz9yiaAmswScsQ31QBr4uOIEnGAyKM3aCVFjB/caYY0CcXmYVPqA7MBTnCOiN/1Q4W4h4C/Rf9D9qs3bzxKifdwNLxhhiQF4V3MGiJw2juuIN6jzOPxrInYRnKHOlYNBnbbuMISfkx0Dqc6ZGmcRB7Za3aMcLkq9BtYxUXC2nPv6vVMPVvir+Ajog/5VqvDqLqPgVxJzGsGP2uoicBlAtIxXfh15jyW+QIK0CdCXYYtV2kDpta7gRuRtwBpYnE+MeHEOxx/mLgZxW0Oke9g3FEYdHWAHv6r5ZkQixTZCGXdAW+wvnALzDJlT6R9lWYhKgwtKM7QkYEaSrVJfQLYxDozOUeRTaYB20FTuQBGnKGes7JqgG5kHXr3QJR3AKDyDp5+lO+t4KnhMguRYI3F8CdSh0T+tI6+TpgKiP1W7HHPkMTyPiJ5jMwTS+WeMo1EALgOT6gkLVVwdlF9CXFF4sMAapL60vtT4ftHlFAAAAAElFTkSuQmCC" alt="search"></img>
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
              // onClick={this.filterUserPosts}
            />
          </div>
        </div>

        <div className="post-list">{posts}</div>

      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  // const { checkBox, searchBox, listOfPosts, id } = reduxState;
  // return { checkBox, searchBox, listOfPosts, id };
  return reduxState
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
