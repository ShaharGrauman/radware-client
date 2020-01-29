import React from "react";


export default class LogIn extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <>
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <div class="alert bg-light text-dark" role="alert">
              <h1>Welcome</h1>
              <form>
                <div class="form-group">
                  <label for="InputUserName">User Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="InputUserName"
                    aria-describedby="UserNameHelp"
                    placeholder="Enter User Name"
                  />
                </div>
                <div class="form-group">
                  <label for="InputPassword">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="InputPassword"
                    placeholder="Password"
                  />
                </div>

                <label >
                  <button type="button" class="btn btn-link ">Reset Password</button>
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


