// import React from "react"; 
// import { Redirect, Link } from "react-router-dom";
// import axios from 'axios';
// // import postResetPassword from '../../api/controllers/admin';

// export default class ResetPassword extends React.Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         loginRedirect: false
//       }
  
//     }
  
//     setRedirect = () => {
//       this.setState({
//         redirect: true
//       });
//     }
//     loginRedirect = page => {
//       if( page === "login"){
//         this.setState({loginRedirect :true})
//       }
//     }

//     resetPassword = async e => {
//       e.preventDefault();
//       const body = {};
//       const password = axios.post('URL', body);
//       // await postResetPassword(body)
//     }
    
// render() 

//    {
// return (
//       <>
// {this.state.loginRedirect && <Redirect to = '/login'/>}
//         <div class="row">
//           <div class="col"></div>
//           <div class="col">
//             <div class="alert bg-light text-dark" role="alert">
//               <h1>Reset Password</h1>
//               <form onSubmit={this.onSubmit}>
//                 <div class="form-group">
//                   <label htmlFor="username">Username</label>
//                   <input
//                     name="username"
//                     class="form-control"
//                     id="username"
//                     aria-describedby="emailHelp"
//                     onBlur={this.onBlur}
//                     placeholder="username"
//                   />
               
//                 </div>
               
//                 <button type="submit" class="btn btn-block btn-secondary" onClick={this.resetPassword}>Send</button>
//                 <div class="form-group">
//                   <label htmlFor="password">Temporary Password</label>
//                   <input
//                     type="password"
//                     class="form-control"
//                     name="temppassword"
//                     id="temppassword"
//                     onBlur={this.onBlur}
//                     placeholder="TempPassword"
//                   />
//                   </div>
//                   <div class="form-group">
//                   <label htmlFor="password">New Password</label>
//                   <input
//                     type="password"
//                     class="form-control"
//                     name="Newpassword"
//                     id="Newpassword"
//                     onBlur={this.onBlur}
//                     placeholder="New Password"
//                   />
//                   </div>
//                   <div class="form-group">
//                   <label htmlFor="password">Confirm Password</label>
//                   <input
//                     type="password"
//                     class="form-control"
//                     name="Confirmpassword"
//                     id="Confirmpassword"
//                     onBlur={this.onBlur}
//                     placeholder="Confirm Password"
//                   />
//                   </div>
//                   <button type="submit" class="btn btn-block btn-secondary">Save</button>
//                   <button type="submit" class="btn btn-block btn-secondary"
//                   onClick ={()=> this.loginRedirect("login")}
//                   >Back to Login</button>
               
//               </form>
//             </div>
//           </div>
//           <div class="col"></div>
//         </div>

//       </>
//     );
  
// }
//     }

import React from "react";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';
import { postResetPassword , putResetPassword, putUpdatePassword} from "../../api/controllers/admin";


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
        updated:false,
        reset:false
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
    console.log("res: ", this.state.resetDetails.username)
    const password = await postResetPassword(this.state.resetDetails.username);
    // const password = axios.post('http://localhost:3000/login/resetPassword', { username: this.state.resetDetails.username });
  this.setState({reset:true})
  }

  updatePassword = async e => {
    e.preventDefault();
  
    if (this.state.resetDetails.newPassword1 === this.state.resetDetails.newPassword2) {
      // axios.put('http://localhost:3000/login/resetPassword', {
      //   username: this.state.resetDetails.username,
      //   tempPwd: this.state.resetDetails.temppassword,
      //   newPwd: this.state.resetDetails.newPassword1
      // });
      await putUpdatePassword(
        this.state.resetDetails.username , 
        this.state.resetDetails.temppassword,
        this.state.resetDetails.newPassword1)
         
        this.setState({updated:true})
        
    } else {
      alert('New password are not equals');
    }
  }

  render() {
    return (
      <>
        {this.state.loginRedirect && <Redirect to='/login' />}
        <div class="row">
          <div class="col"></div>
          <div class="col">
            
            <div class="alert bg-light text-dark" role="alert">
              <h1>Reset Password </h1>
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
                    onChange={this.onChangeHandler}
                  />

                </div>

                <button type="submit" class="btn btn-block btn-secondary" onClick={this.resetPassword}>Send</button>
               {this.state.reset && ( <small class="text-danger"> your reset password has been sent to your mail </small>)}
                <div class="form-group">
                  <label htmlFor="password">Temporary Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="temppassword"
                    id="temppassword"
                    onBlur={this.onBlur}
                    placeholder="TempPassword"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="newPassword1"
                    id="Newpassword"
                    onBlur={this.onBlur}
                    placeholder="New Password"
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="newPassword2"
                    id="Confirmpassword"
                    onBlur={this.onBlur}
                    placeholder="Confirm Password"
                    onChange={this.onChangeHandler}
                  />
                 
                
                </div>

                {this.state.updated && (
                <div class="alert alert-success" role="alert">Password Changed Successfully</div>
                  )}
                <button type="submit" class="btn btn-block btn-secondary" onClick={this.updatePassword}>Save</button>
          
              </form>
            </div>
          </div>
          <div class="col"></div>
        </div>

      </>
    );

  }
}
