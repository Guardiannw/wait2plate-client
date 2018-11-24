import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";

import { loginThunk, signupThunk, CLEAR_ERROR } from "../actions";

import "./Login.css";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "login",
      username: "",
      email: "",
      pass: "",
      cpass: "",
      toRestaruants: false
    };
  }

  handleLogin = async e => {
    e.preventDefault();
    const { username, pass } = this.state;
    try {
      await this.props.loginThunk(username, pass);
      this.setState({ username: "", pass: "", toRestaruants: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleSignup = async e => {
    e.preventDefault();
    const { username, email, pass } = this.state;
    try {
      await this.props.signupThunk(username, email, pass);
      this.setState({
        username: "",
        email: "",
        pass: "",
        cpass: "",
        toRestaruants: true
      });
      // this.props.history.push(`/restaurants`);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    if (this.props.error === null && this.state.toRestaruants === true) {
      return <Redirect to="/restaurants" />;
    }
    return (
      <div>
        <header role="banner">
          <h1>Sign up/Login Page</h1>
          <h2>Join the community to enjoy great meals at fast times.</h2>
        </header>
        <div className="tabs">
          <button
            className="btn-tab"
            onClick={() => this.setState({ tab: "login" })}
          >
            Login
          </button>
          <button
            className="btn-tab"
            onClick={() => this.setState({ tab: "signup" })}
          >
            Sign-Up
          </button>
        </div>
        {this.state.tab !== "login" ? (
          <section className="signup">
            <header>
              <h3>Sign up</h3>
              {this.props.error !== null && (
                <h4 className="error">{this.props.error} </h4>
              )}
            </header>
            <form className="signup-form" onSubmit={this.handleSignup}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  required
                  placeholder="username"
                  type="text"
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={e => {
                    this.setState({ username: e.target.value });
                  }}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Wait2Plate@food.com"
                  id="email"
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  placeholder="password"
                  name="password"
                  id="password"
                  value={this.state.pass}
                  onChange={e => {
                    this.setState({ pass: e.target.value });
                  }}
                />
              </div>
              <div>
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="cpassword"
                  id="cpassword"
                  value={this.state.cpass}
                  onChange={e => {
                    this.setState({ cpass: e.target.value });
                  }}
                />
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </section>
        ) : (
          <section className="login">
            <header>
              <h3>Login</h3>
              {this.props.error !== null && (
                <h4 className="error">{this.props.error} </h4>
              )}
            </header>
            <form className="login-form" onSubmit={this.handleLogin}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  required
                  placeholder="username"
                  type="text"
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={e => {
                    this.setState({ username: e.target.value });
                  }}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  placeholder="password"
                  value={this.state.pass}
                  onChange={e => {
                    this.setState({ pass: e.target.value });
                  }}
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </section>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fetching: state.fetching,
    fetched: state.fetched,
    error: state.error
  };
}

const mapDispatchtoProps = {
  loginThunk,
  signupThunk
};

const LoginWithRouter = withRouter(Login);
export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(LoginWithRouter);
