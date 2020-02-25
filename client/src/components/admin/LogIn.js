import React from "react";

import { Redirect } from "react-router-dom";
import { login } from '../../api/controllers/admin';
import { setUser, getUser } from '../../api/controllers/auth';
import Homepages from './homepages';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMsg: '',
      role: '',
      redirect: false,
      resetClicked: false
    }

  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      if (this.state.role != '') {
        return <Redirect to={`/${this.state.role}`} />
      }
    }
  }
  resetRedirect = page => {
    if (page === "resetpassword") {
      this.setState({ resetClicked: true })
    }
  }
  onBlur = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  }
  onSubmit = async e => {
    e.preventDefault();
    const user = await login(this.state.username, this.state.password);
    try {
      let role = user.roles[0].name;
      this.setState({ role: user.roles[0].name });
      this.setState({ errorMsg: '' });
      setUser(user);
      window.location.reload();
    } catch (error) {
      this.setState({
        errorMsg: user
      });
    }
  }

  render() {
    if (getUser()) return <Redirect to="/" />

    if (this.state.role !== '') {
      return Homepages(this.state.role);
    }
    return (
      <>
        {this.state.resetClicked && <Redirect to='/resetpassword' />}
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <div class="alert bg-light text-dark" role="alert">
              <h1>Welcome</h1>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    name="username"
                    class="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    onBlur={this.onBlur}
                    placeholder="username"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
            </small>
                </div>
                <div class="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    id="password"
                    onBlur={this.onBlur}
                    placeholder="Password"
                  />
                </div>
                {
                  this.state.errorMsg && <div class="alert alert-danger" role="alert">
                    {this.state.errorMsg}
                  </div>
                }
                <label >
                  <button type="button" class="btn btn-link " onClick={() => this.resetRedirect("resetpassword")}> Reset Password </button>
                </label>
                <button type="submit" class="btn btn-block btn-secondary">Sign In</button>
              </form>
            </div>
          </div>
          <div class="col"></div>
        </div>

      </>
    );
  }
}


