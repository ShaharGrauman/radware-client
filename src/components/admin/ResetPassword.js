import React from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resetPassword, updatePassword } from "../../api/controllers/admin";
import { faUser, faKey, faUnlockAlt, faLockOpen } from '@fortawesome/free-solid-svg-icons';
export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resetDetails: {
        username: '',
        loginRedirect: false,
        newPassword1: '',
        newPassword2: '',
        temppassword: '',
        updated: false,
        reset: false,
        passwordconfirm: false,
        message: {},
        ifEmpty: ''
      }
    }
  }

  onChangeHandler = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const unsavedData = { ...this.state.resetDetails, [target.name]: value };
    this.setState({ resetDetails: unsavedData });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  }

  loginRedirect = page => {
    if (page === "login") {
      this.setState({ loginRedirect: true })
    }
  }

  resetPassword = async e => {
    e.preventDefault();
    try {
      const password = await resetPassword(this.state.resetDetails.username);
      this.setState({ message: password })
      if (!(password === "No user found with that email address.")) {
        this.setState({ reset: true })
      }
    } catch (error) {
      this.setState({ message: "Internal error, please try again later" })
    }
  }

  updatePassword = async e => {
    e.preventDefault();
    if (this.state.resetDetails.newPassword1 === '' || this.state.resetDetails.newPassword2 === ''
      || this.state.resetDetails.username === '') {
      this.setState({
        ifEmpty: 'One or more values are missing',
        message: ' ',
        password: ' '
      })
      return;
    }
    if (this.state.resetDetails.newPassword1 === this.state.resetDetails.newPassword2) {
      const updatepass = await updatePassword(
        this.state.resetDetails.username,
        this.state.resetDetails.temppassword,
        this.state.resetDetails.newPassword1)
      this.setState({ updated: true, updated: updatepass, ifEmpty: ' ', passwordconfirm: false })
    } else {
      this.setState({ passwordconfirm: true, ifEmpty: ' ' })
    }
  }

  render() {
    return (
      <>
        {this.state.loginRedirect && <Redirect to='/login' />}
        <div class="row">
          <div class="col"></div>
          <div class="col-md-6 col-sm-10">

            <div class="alert bg-light text-dark" style={{ fontFamily: "cursive", fontSize: "15px" }}>
              <div className="text-center mb-4">
                <FontAwesomeIcon className="fa-lg fa-3x mr-3" icon={faUnlockAlt}> </FontAwesomeIcon>
                <h1 className="mt-2" >Reset Password</h1>
              </div>
              <form onSubmit={this.onSubmit}>
                <div class="input-group flex-nowrap mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon className="fa-lg " icon={faUser}> </FontAwesomeIcon> </span>
                  </div>
                  <input
                    name="username"
                    class="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    onBlur={this.onBlur}
                    placeholder="username"
                    onChange={this.onChangeHandler}
                  />
                </div>

                <button type="submit" class="btn btn-block btn-secondary " onClick={this.resetPassword}>Send</button>
                <div className="mb-2">
                  {(<small class="text-danger"> {this.state.message} </small>)}
                </div>
                <label htmlFor="password">Temporary Password</label>
                <label className="text-danger ml-2">*</label>
                <div class="input-group flex-nowrap mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon className="fa-lg " icon={faKey}> </FontAwesomeIcon> </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    name="temppassword"
                    id="temppassword"
                    onBlur={this.onBlur}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <label htmlFor="password">New Password</label>
                <label className="text-danger ml-2">*</label>
                <div class="input-group flex-nowrap mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon className="fa-lg " icon={faLockOpen}> </FontAwesomeIcon> </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    name="newPassword1"
                    id="Newpassword"
                    onBlur={this.onBlur}
                    onChange={this.onChangeHandler}
                  />
                </div>
                <label htmlFor="password">Confirm Password</label>
                <label className="text-danger ml-2">*</label>
                <div class="input-group flex-nowrap mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="addon-wrapping"><FontAwesomeIcon className="fa-lg " icon={faLockOpen}> </FontAwesomeIcon> </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    name="newPassword2"
                    id="Confirmpassword"
                    onBlur={this.onBlur}
                    onChange={this.onChangeHandler}
                  />
                </div>

                {this.state.updated && (
                  <div class="text-success mb-3" role="alert">{this.state.updated}</div>
                )}
                {this.state.passwordconfirm && (
                  <div className="text-danger ml-2 mb-4" >Your password and confirmation password do not match.</div>
                )}

                <div className="mb-2">
                  {(!this.state.updated) && (<small class="text-danger"> {this.state.ifEmpty} </small>)}
                </div>
                <button type="submit" class="btn btn-block btn-secondary" onClick={this.updatePassword}>Save</button>
                <button type="button" class="btn btn-block btn-secondary" onClick={() => this.loginRedirect("login")}>Back to Login</button>
              </form>
            </div>
          </div>
          <div class="col"></div>
        </div>

      </>
    );

  }
}
