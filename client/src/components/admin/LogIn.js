import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faWindowClose, faEdit, faCalculator, faTrash } from '@fortawesome/free-solid-svg-icons';

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
      // return <Redirect to='./AdminDashboard' />
    }
  }
  resetRedirect = page => {
    if( page === "resetpassword"){
      this.setState({resetClicked :true})
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
      const { data } = await axios.post('http://localhost:3001/login',  
      this.state
        // ,
        // { withCredentials: true }
        );
      let role= data.roles[0].name;
      console.log(data);
      console.log(role);
      this.setState({ role: data.roles[0].name });
      this.setState({ errorMsg: '' });
      localStorage.setItem('loginDetails', JSON.stringify(data));
      window.location.reload();
    } catch (error) {
      this.setState({
        errorMsg: 'Invalid email or password'
      });
    }
  }
  
  // componentDidMount() {
  //   axios.get(`http://localhost:3000/login`, (req, res) => res.json()
  //   ).then(res => {
  //       const users = res.data.map(user => ({
  //         ...user
  //       }));
  //       console.log(JSON.stringify(users));
  //       this.setState({users: users });
  //     });
  // }
  // onResetClick =() =>{
  //   return <Link to = {`/ResetPassword/`}/>
  // }

  
  render() {

    if (this.state.role !== '') {
      return <Redirect to='/' />
    }
    return (
      <>
          {/* {this.renderRedirect()} */}
          {this.state.resetClicked && <Redirect to = '/resetpassword'/>}
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
                  <button type="button" class="btn btn-link " onClick ={()=> this.resetRedirect("resetpassword")}> Reset Password </button>
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


