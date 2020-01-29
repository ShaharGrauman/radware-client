import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter, useHistory, useLocation } from 'react-router-dom'
import axios from 'axios';

import MyTable from '../shared/MyTable';


class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUsers: [],
      users: [],
      rolesManagementClicked: false,
      newUserClicked: false
    }
  }

  renderRedirect = page => {
    if (page === "newuser") {
      this.setState({
        newUserClicked: true
      });
    }
    if (page === "roleslist") {
      this.setState({
        rolesManagementClicked: true
      });
    }
  }

  SortByKey(sortKey) {
    let sorted;
    if (this.state.isSorted) {
      sorted = this.state.orgUsers.sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);
    }
    else {
      sorted = this.state.orgUsers.sort((a, b) => a[sortKey] < b[sortKey] ? 1 : -1);
    }
    this.setState({ users: sorted, isSorted: !this.state.isSorted })
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/users`, (req, res) => res.json()
    ).then(res => {
        const data = res.data;
          this.setState({ orgUsers: data, users: data });
        });
  }
  
  tableHeaders = ["SeqID", "Username", "Phone", "Roles", "Status"];


  render() {

    return (
      <>
        <div>
          {this.state.rolesManagementClicked && <Redirect to='/roleslist' />}
          {this.state.newUserClicked && <Redirect to='/newuser' />}
          <div className="ml-3 mb-3">
            <h2>Admin Dashboard</h2>
            <h4>Users` Management</h4>
          </div>
          <div className="ml-2 mb-3">
            <button type="button" className="ml-2 mr-4 btn btn-secondary"
              onClick={() => this.renderRedirect("newuser")}
            >New user</button>
            <button type="button" className="btn btn-secondary"
              onClick={() => this.renderRedirect("roleslist")}
            >Roles Managment</button>
          </div>

          <div className="container ml-0">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                <MyTable
                  header={this.tableHeaders}
                  data={this.state.users}
                  sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.users.SeqID}</Table>
              </div>
            </div></div>


        </div>
      </>

    );
  }



}

export default withRouter(App);


