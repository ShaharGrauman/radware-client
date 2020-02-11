import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter} from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyTable from '../shared/MyTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faWindowClose, faEdit, faCalculator, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    if(sortKey.sortOrder)
      sorted = this.state.orgUsers.sort((a, b) => a[sortKey.key] > b[sortKey.key] ? 1 : -1);
    
    else 
      sorted = this.state.orgUsers.sort((a, b) => a[sortKey.key] < b[sortKey.key] ? 1 : -1);
    sortKey.sortOrder= !sortKey.sortOrder;
    this.setState({ users: sorted})
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/users`, (req, res) => res.json()
    ).then(res => {
        const users = res.data.map(user => ({
          ...user, 
          roles: user.roles.map(role => role.description).join(', '),
          actions: [
            <button type="button" key={user.id+"edit"} title="Edit" className="btn btn-outline float-left "><Link to={`/edit_user/${user.id}`}><FontAwesomeIcon className="fa-lg " icon={faEdit}> </FontAwesomeIcon></Link></button>,
            <button type="button" key={user.id+"delete"} title="Delete" className="btn  btn-outline float-left" ><FontAwesomeIcon className="fa-lg " icon={faTrash}></FontAwesomeIcon></button>,
            ]
        }));

        this.setState({ orgUsers: users, users: users });
      });
  }
  tableHeaders = [{key: "id", value: "SeqID", toSort: true, sortOrder: true},
  {key: "username", value: "Username", toSort: true, sortOrder: true},
  {key: "phone", value: "Phone", toSort: false, sortOrder: true},
  {key: "status", value: "Status", toSort: true, sortOrder: true},
  {key: "roles", value: "Roles", toSort: true, sortOrder: true},
  {key: "actions", value: "", toSort: false, sortOrder: true}

];

  render() {

    return (
      <>
        <div>
          {this.state.rolesManagementClicked && <Redirect to='/admin/roles'/>}
          {this.state.newUserClicked && <Redirect to='/newuser'/>}
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
