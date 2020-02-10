import React from "react"; 
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';


export default class ResetPassword extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        loginRedirect: false
      }
  
    }
  
    setRedirect = () => {
      this.setState({
        redirect: true
      });
    }
    loginRedirect = page => {
      if( page === "login"){
        this.setState({loginRedirect :true})
      }
    }

    resetPassword = e => {
      e.preventDefault();
      const body = {};
      const password = axios.post('URL', body);
    }
    
render() 

   {
return (
      <>
{this.state.loginRedirect && <Redirect to = '/login'/>}
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <div class="alert bg-light text-dark" role="alert">
              <h1>Reset Password</h1>
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
               
                </div>
               
                <button type="submit" class="btn btn-block btn-secondary" onClick={this.resetPassword}>Send</button>
                <div class="form-group">
                  <label htmlFor="password">Temporary Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="temppassword"
                    id="temppassword"
                    onBlur={this.onBlur}
                    placeholder="TempPassword"
                  />
                  </div>
                  <div class="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="Newpassword"
                    id="Newpassword"
                    onBlur={this.onBlur}
                    placeholder="New Password"
                  />
                  </div>
                  <div class="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="Confirmpassword"
                    id="Confirmpassword"
                    onBlur={this.onBlur}
                    placeholder="Confirm Password"
                  />
                  </div>
                  <button type="submit" class="btn btn-block btn-secondary">Save</button>
                  <button type="submit" class="btn btn-block btn-secondary"
                  onClick ={()=> this.loginRedirect("login")}
                  >Back to Login</button>
              </form>
            </div>
          </div>
          <div class="col"></div>
        </div>

      </>
    );
  
}
    }
