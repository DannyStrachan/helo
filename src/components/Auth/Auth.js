import "./Auth.css";
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";

class Auth extends Component {
  state = {
    usernameInput: "",
    passwordInput: ""
  };

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  register = () => {
    const { usernameInput: username, passwordInput: password } = this.state;
    axios
      .post("/auth/register", { username, password })
      .then(res => {
        this.props.setUser(res.data.user);
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        alert("Nope but thanks for asking! Username taken...");
      });
  };

  login = () => {
    const { usernameInput: username, passwordInput: password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then(res => {
        this.props.setUser(res.data.user);
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        alert(`That didn't work... Try Agian!`);
      });
  };

  render() {
    return (
      <div className="auth">
        <div className="box">
          <div className="logo">SMiley</div>
          <div className="title">
            <h1>Helo</h1>
          </div>
          <form className="auth-form">
            <h3>Username:</h3>
            <input
              type="text"
              onChange={e => this.handleChange(e, "usernameInput")}
            />
            <h3>Password:</h3>
            <input
              type="text"
              onChange={e => this.handleChange(e, "passwordInput")}
            />
          </form>
          <div className="buttons">
            <button className="login-btn" onClick={this.login}>
              Login
            </button>
            <button className="register-btn" onClick={this.register}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(Auth);
