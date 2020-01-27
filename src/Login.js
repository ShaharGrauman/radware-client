import React from "react";
import axios from "axios";
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onBlur = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    });
  }

  onSubmit = async e => {
    e.preventDefault();
    const response = await axios.post('http://localhost:3001/login',
       this.state
      ,{ withCredentials:true
    });
    console.log(response);
  }

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email address</label>
            <input
              type="email"
              className="form-control"
              name="username"
              id="username"
              aria-describedby="emailHelp"
              onBlur={this.onBlur}
            ></input>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onBlur={this.onBlur}
            ></input>
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberme"
            ></input>
            <label className="form-check-label" htmlFor="rememberme">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
}
