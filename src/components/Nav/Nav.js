import "./Nav.css";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

function Nav(props) {
  if (props.location.pathname === "/") return null;
  return (
    <div className="nav">
      <div className="profile">
        <img className="pic" src={props.profilePic} alt="" />
        <p className="username">{props.username}</p>
      </div>
      <div className="nav-buttons">
      <div className="home-post">
        <Link to="/dashboard">
          <button className="home-btn">House</button>
        </Link>
        <Link to="/new">
          <button className="post-btn">New Post</button>
        </Link>
      </div>
      <div className="logout">
        <Link to="/">
          <button className="logout-btn">Power</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

function mapStateToProps(reduxState) {
  const { username, profilePic, user } = reduxState;
  return { username, profilePic, user };
}

export default connect(mapStateToProps)(withRouter(Nav));

// export default connect(
//   mapStateToProps,
//   { logoutUser }
// )(withRouter(Nav))
