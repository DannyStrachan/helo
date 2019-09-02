import "./Form.css";
import React, { Component } from "react";
import store from "./../../ducks/store";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setPost, clearEntries } from "./../../ducks/reducer";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState();
    this.state = {
      title: "",
      img: "",
      content: "",
      id: reduxState.id
    };
  }

  // componentDidMount(reduxState) {
  //     this.setState({
  //         title: reduxState.title,
  //         imgUrl: reduxState.imgUrl,
  //         content: reduxState.content
  //     })
  // }
  componentDidMount() {
    store.subscribe(() => {
      store.getState();
    });
  }

  addPost = (req, res, next) => {
    let { title, img, content } = this.state;
    axios
      .post("/api/posts/create", { title, img, content })
      .then(() => this.props.clearEntries())
      .catch(() => console.log(`Add Post Failed!`))
      .then(window.location.href = `http://localhost:3000/#/dashboard`)
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="form">
        <form>
          <h1>New Post</h1>
          <h3>Title:</h3>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={e => this.handleInputChange(e)}
          />
          <img className="post-image" src={this.state.img} alt="" />
          <h3>Image URL:</h3>
          <input
            type="text"
            name="img"
            value={this.state.img}
            onChange={e => this.handleInputChange(e)}
          />
          <h3>Content:</h3>
          <textarea
            type="text"
            name="content"
            value={this.state.content}
            onChange={e => this.handleInputChange(e)}
          />
          <button onClick={this.addPost} >Post</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { title, img, content } = reduxState;
  return { title, img, content };
}

export default connect(
  mapStateToProps,
  { setPost, clearEntries }
)(withRouter(Form));
