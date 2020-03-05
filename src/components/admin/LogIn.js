import React from "react";
import Homepages from './homepages';
import { Redirect } from "react-router-dom";
import { login } from '../../api/controllers/admin';
import { setUser, getUser } from '../../api/controllers/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUsers } from '@fortawesome/free-solid-svg-icons';

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
    try {
      const user = await login(this.state.username, this.state.password);
      if (typeof user == 'string') {
        this.setState({
          errorMsg: user
        });
        return;
      }
      this.setState({ role: user.roles[0].name });
      this.setState({ errorMsg: '' });
      setUser(user);
      window.location.reload();
    } catch (error) {
      this.setState({
        errorMsg: "Something went wrong... Please try again "
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
        <div class="card text-center">
          <div class="card-body">
            <h5 class="card-title" style={{ fontFamily: "cursive", fontSize: "30px", textAlign: "center" }}>Login</h5>
            <p class="card-text">

              <div class="row alert bg-light text-dark">
                <div class="col"></div>
                <div class="col-md-6 col-sm-10">
                  <div role="alert">
                    <h1 ><FontAwesomeIcon className="fa-lg " icon={faUsers}> </FontAwesomeIcon></h1>
                    <form onSubmit={this.onSubmit}>

                      <div class="input-group flex-nowrap mt-4">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon className="fa-lg " icon={faUser}> </FontAwesomeIcon> </span>
                        </div>
                        <input
                          name="username"
                          class="form-control"
                          id="username"
                          aria-describedby="emailHelp"
                          onBlur={this.onBlur}
                          placeholder="Email"
                        />

                      </div>

                      <div class="input-group flex-nowrap mt-4 pb-4">
                        <div class="input-group-prepend">
                          <span class="input-group-text " id="addon-wrapping"><FontAwesomeIcon className="fa-lg " icon={faLock}> </FontAwesomeIcon> </span>
                        </div>
                        <input
                          type="password"
                          class="form-control"
                          name="password"
                          id="password"
                          onBlur={this.onBlur}
                          placeholder="Password"
                        />
                      </div>

                      {this.state.errorMsg && <div className="mb-3" style={{ color: "red" }}>
                        {this.state.errorMsg}
                      </div>
                      }
                      <button type="submit" className="btn btn-block btn-secondary" style={{ fontFamily: "cursive", fontSize: "20px" }}>Sign In</button>
                    </form>
                  </div>
                </div>
                <div class="col"></div>
              </div>
            </p>
          </div>

          <div class="card-footer text-muted">
            <button type="button" className="btn btn-link mr-4 " onClick={() => this.resetRedirect("resetpassword")}> Reset Password </button>
          </div>
        </div>
      </>
    );
  }
}