import React from "react";
import Register from "./Register";

export default class NewUserDashboard extends React.Component {
  // componentDidMount() {
  //   fetch('http://localhost:3001/users')
  //     .then(response => response.json())
  //     .then(
  //       data => {
  //         this.setState({ orgUsers: data } );
  //       });
  // }

  render() {
    return (
      <>
            <div className="container">
            <div className="row mt-2">
                <div className="col-6 ml-4">
                    <h1>New User</h1>
                </div>
            </div>
                <div className="col-md-12">
                     <Register/>
                 </div>
            </div>
            </>
    );
  }

}
