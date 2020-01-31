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
    if (page === "/admin/roles") {
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
    axios.get(`http://localhost:3000/users`, (req, res) => res.json()
    ).then(res => {
        const users = res.data.map(user => ({
          ...user, 
          roles: user.roles.map(role => role.description).join(',')
        }));

        this.setState({ orgUsers: users, users: users });
      });
  }
  
  tableHeaders = ["SeqID", "Username", "Phone", "Roles", "Status"];


  render() {

    return (
      <>
        <div>
          {this.state.rolesManagementClicked && <Redirect to='/admin/roles' />}
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
              onClick={() => this.renderRedirect('/admin/roles')}
            >Roles Managment</button>
          </div>

          <div className="container ml-0">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                <MyTable
                  header={this.tableHeaders}
                  data={this.state.users}
                  sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.users.SeqID}</MyTable>
              </div>
            </div></div>
        </div>
      </>

    );
  }



}

export default withRouter(AdminDashboard);


