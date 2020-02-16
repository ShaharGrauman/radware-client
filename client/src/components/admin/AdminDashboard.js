import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter, useHistory, useLocation, matchPath } from 'react-router-dom'
import { getUsers } from '../../api/controllers/admin';
import { Link } from 'react-router-dom';
import MyTable from '../shared/MyTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faWindowClose, faEdit, faCalculator, faTrash, faAlignCenter, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUsers: [],
      users: [],
      id: 0,
      newUserClicked: false
    }
  }

  renderRedirect = page => {
    if (page === "newuser") {
      this.setState({
        newUserClicked: true
      });
    }
  }

  SortByKey(sortKey) {
    let sorted;
    if (sortKey.sortOrder)
      sorted = this.state.orgUsers.sort((a, b) => a[sortKey.key] > b[sortKey.key] ? 1 : -1);

    else
      sorted = this.state.orgUsers.sort((a, b) => a[sortKey.key] < b[sortKey.key] ? 1 : -1);
    sortKey.sortOrder = !sortKey.sortOrder;
    this.setState({ users: sorted })
  }

  async componentDidMount() {
    const users = await getUsers();

    const usersWithRoles = users.map(user => ({
      ...user,
      roles: user.roles.map(role => role.description).join(', '),
      actions: [
        //key={user.id + "edit"}
        // key={user.id + "edit"}
        <button type="button" key={user.id + "edit"} title="Edit" className="btn btn-outline float-left "><Link to={`/edit_user/${user.id}`} ><FontAwesomeIcon className="fa-lg " icon={faEdit}> </FontAwesomeIcon></Link></button>,
        <button type="button" key={user.id + "delete"} title="Delete" className="btn  btn-outline float-left" ><FontAwesomeIcon className="fa-lg " icon={faTrash}></FontAwesomeIcon></button>,
      ]
    }));

    this.setState({ 
      orgUsers: usersWithRoles, 
      users: usersWithRoles 
    });
  }

  tableHeaders = [{ key: "id", value: "SeqID", toSort: true, sortOrder: true },
  { key: "name", value: "Name", toSort: true, sortOrder: true },
  { key: "username", value: "Username", toSort: true, sortOrder: true },
  { key: "phone", value: "Phone", toSort: false, sortOrder: true },
  { key: "status", value: "Status", toSort: true, sortOrder: true },
  { key: "roles", value: "Roles", toSort: true, sortOrder: true },
  { key: "actions", value: "", toSort: false, sortOrder: true }

  ];

  render() {

    return (
      <>
        <div>
          {this.state.newUserClicked && <Redirect to='/newuser' />}
          <div className="row">
            <div className="col-md-11 col-sm-11 col-11">
              <div className="ml-3 mb-3">
                <h2>Admin Dashboard</h2>
                <h4>Users` Management</h4>
              </div>
            </div>

            <div className=" ml-3 mb-4">
              <button type="button" title="add user" className="btn btn-outline float-left" onClick={() => this.renderRedirect("newuser")}>
                <FontAwesomeIcon size="3x" icon={faUserPlus}></FontAwesomeIcon></button>
            </div>
          </div>
          <div className="row">
            <div className=" mr-3 mb-4"></div>
          </div>

          <div className=" ml-3 mr-3">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                <MyTable
                  header={this.tableHeaders}
                  data={this.state.users}
                  sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ></MyTable>
              </div>
            </div></div>
        </div>
      </>

    );
  }
}

export default withRouter(AdminDashboard);
