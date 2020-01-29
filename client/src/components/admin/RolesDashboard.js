import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter, useHistory, useLocation } from 'react-router-dom'
import MyTable from '../shared/MyTable';
import axios from 'axios';  


export default class RolesDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orgRoles: [],
      roles: [],
      usersManagementClicked: false,
      newRoleClicked: false
    }
  }
  renderRedirect = page => {
    if (page === "newrole") {
      this.setState({
        newRoleClicked: true
      });
    }
    if (page === "users") {
      this.setState({
        usersManagementClicked: true
      });
    }
  }

  SortByKey(sortKey) {
    let sorted;
    if (this.state.isSorted) {
      sorted = this.state.orgRoles.sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);
    }
    else {
      sorted = this.state.orgRoles.sort((a, b) => a[sortKey] < b[sortKey] ? 1 : -1);
    }
    this.setState({ roles: sorted, isSorted: !this.state.isSorted })
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/roles`, (req, res) => res.json()
    ).then(res => {
        const data = res.data;
          this.setState({ orgRoles: data, roles: data });
        });
  }

  tableHead= ["ID ", "Rolename ", "Permissions "];
  // rolesData = {
  //   tableHead: ["SeqID ", 'Role Name ', 'Permissions '],
  //   tableData: [{
  //     seqID: 1, roleName: 'Researcher', permissions:
  //       ['create signature', 'edit signature', 'search signature', 'export signature']
  //   },
  //   { seqID: 2, roleName: 'Performance QA', permissions: ['QA dashboard'] },
  //   { seqID: 3, roleName: 'Support', permissions: ['Search'] }
  //   ]
  // };

  render() {
    return (
      <div>
        {this.state.usersManagementClicked && <Redirect to='/users' />}
        {this.state.newRoleClicked && <Redirect to='/newrole' />}
        <div class="ml-3 mb-3">
          <h2>Roles Management</h2>
        </div>
        <div class="ml-2 mb-3">
          <button type="button" onClick={() => this.renderRedirect("newrole")} class="ml-2 mr-4 btn btn-secondary">New Role</button>
          <button type="button" onClick={() => this.renderRedirect("users")} class="btn btn-secondary">Users Management</button>
        </div>

        <div class="container ml-0">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
              <MyTable
                header={this.tableHead}
                // header={this.rolesData.tableHead}
                //  data={this.rolesData.tableData}
                data = {this.state.roles}
                sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}></MyTable>
            </div>
          </div></div>


      </div>


    );
  }



}

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

