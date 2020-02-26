import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter, useHistory, useLocation, matchPath } from 'react-router-dom'
import { getUsers, deleteUser } from '../../api/controllers/admin';
import { Link } from 'react-router-dom';
import AdminTable from '../shared/AdminTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal/Modal';
import Backdrop from './Backdrop/Backdrop';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: [],
      users: [],
      deletedUsers: [],
      sortedDeletedUsers: [],
      id: 0,
      newUserClicked: false,
      deleteUserClicked: false,
      showDeletedUsersClicked: false,
      modalIsOpen: false,
      deleteUser:'',
      message: 'a'
    }
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  ifClickedDeleteUser = (id) => {
    this.setState({ modalIsOpen: true ,
                    deleteUser: id});
    
  }
  clickDeleteUser = () => {
    this.deleteUser(this.state.deleteUser);
    this.setState({ modalIsOpen: false })
  }
  deleteUser = async (username) => {
    try {
      await deleteUser(username);
      const updatedUsers = this.state.users.filter(function (element) { return element.username != username; });
      this.setState({ users: updatedUsers })
    } catch (error) {
      console.log(error);
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
    if(sortKey.key != "id" && sortKey.key != "phone" ){
      if (sortKey.sortOrder)
      sorted = this.state.users.sort((a, b) => a[sortKey.key].toLowerCase() > b[sortKey.key].toLowerCase() ? 1 : -1);
    else
      sorted = this.state.users.sort((a, b) => a[sortKey.key].toLowerCase() < b[sortKey.key].toLowerCase() ? 1 : -1);
    }
    else{
      if (sortKey.sortOrder)
      sorted = this.state.users.sort((a, b) => a[sortKey.key] > b[sortKey.key] ? 1 : -1);
    else
      sorted = this.state.users.sort((a, b) => a[sortKey.key] < b[sortKey.key] ? 1 : -1); 
    }
    sortKey.sortOrder = !sortKey.sortOrder;
    this.setState({ users: sorted })
  }

  
  showDeletedUsers = async e => {
    await this.setState({showDeletedUsersClicked: !this.state.showDeletedUsersClicked})
    if(this.state.showDeletedUsersClicked){
      this.setState({users: this.state.deletedUsers})
    } 
    else{
      this.setState({users: this.state.activeUsers})
    } 
  }
  async componentDidMount() {
    const users = await getUsers();
    const usersWithRoles = [];
    const deletedUsers = [];
    users.forEach(user => {
      if(user.status != "deleted"){
        usersWithRoles.push({...user, roles: user.roles.map(role => role.name).join(', '),
        actions: [
          <button type="button" key={user.id + "edit"} title="Edit" className="btn btn-outline float-left "><Link to={`/edit_user/${user.id}`} ><FontAwesomeIcon className="fa-lg " icon={faEdit}> </FontAwesomeIcon></Link></button>,
          <button type="button" key={user.id + "delete"} title="Delete" className="btn  btn-outline float-left" onClick={() => this.ifClickedDeleteUser(user.username)}><FontAwesomeIcon className="fa-lg " icon={faTrash}></FontAwesomeIcon></button>,
        ]})
      }
      else{
        deletedUsers.push({...user, roles: user.roles.map(role => role.name).join(', '),
        actions: [
          <button type="button" key={user.id + "edit"} title="Edit" className="btn btn-outline float-left ">
            <Link to={`/edit_user/${user.id}`} ><FontAwesomeIcon className="fa-lg " icon={faEdit}> </FontAwesomeIcon>
              </Link>
              </button>    
        ]
      })
      }
    })
    this.setState({
      activeUsers: usersWithRoles,
      users: usersWithRoles,
      deletedUsers: deletedUsers
    });
  }

  tableHeaders = [{ key: "id", value: "SeqID", toSort: true, sortOrder: true },
  { key: "name", value: "Name", toSort: true, sortOrder: true },
  { key: "username", value: "Username", toSort: true, sortOrder: true },
  { key: "phone", value: "Phone", toSort: false, sortOrder: true },
  { key: "status", value: "Status", toSort: false, sortOrder: true },
  { key: "roles", value: "Roles", toSort: true, sortOrder: true },
  { key: "actions", value: "", toSort: false, sortOrder: true }

  ];

  
  render() {
    if (this.state.modalIsOpen) {
      return (
        <div>
          <Modal show={this.state.modalIsOpen} closed={this.closeModal} clickDelete={this.clickDeleteUser} />
          <Backdrop show={this.state.modalIsOpen} />
        </div>
      )
    }
 
    return (
      <>
          {this.state.newUserClicked && <Redirect to='/newuser' />}
          <div className="row ml-3 mr-3">
            <div className="col-lg-10 col-md-9 col-sm-6">
                <h2>Admin Dashboard</h2>
                <h4>Users Management</h4>
            </div>
            <div className="col ml-3 mb-3 float-right">
              <div>
              <button type="button" title="add user" className="btn btn-outline mb-3 float-right" onClick={() => this.renderRedirect("newuser")}>
                <FontAwesomeIcon size="3x" icon={faUserPlus}></FontAwesomeIcon></button>
                </div>
            </div>
          </div>
          <div className="row ml-3 mr-3">
<div className="col-10"></div>
<div className="col-2">
<button type="button" title="Show Deleted Users" className="btn btn-primary mb-3 float-right"style={{ width: "200px" }}
            onClick={this.showDeletedUsers}>
            {(!this.state.showDeletedUsersClicked && "Show Deleted Users") ||
            (this.state.showDeletedUsersClicked && "Back to Users")}
                </button>
</div>
                
          </div>

          <div className="row ml-3 mr-3">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                <AdminTable
                  header={this.tableHeaders}
                  data={this.state.users}
                  
                  sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ></AdminTable>
              </div>
            </div>

        
      </>

    );
  }
}

export default withRouter(AdminDashboard);
