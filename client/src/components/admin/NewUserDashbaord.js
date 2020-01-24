import React from "react";
import Register from "./Register";

export default class NewUserDashboard extends React.Component {
  
  render() {
    return (
      <>
            <div className="container">
            <div className="row mt-2">
                <div className="col-6 ml-3">
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
