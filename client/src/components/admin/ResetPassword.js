import React from "react"; 
import { Redirect } from "react-router-dom";


export default class ResetPassword extends React.Component {
    constructor(props) {
      super(props)
    }



render() 

   {
return (
      <>
          {/* {this.renderRedirect()} */}
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
               
                <button type="submit" class="btn btn-block btn-secondary">Send</button>
              </form>
            </div>
          </div>
          <div class="col"></div>
        </div>

      </>
    );
  
}
    }
