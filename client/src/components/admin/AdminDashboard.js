import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter, useHistory, useLocation, matchPath } from 'react-router-dom'
import { getUsers, deleteUser } from '../../api/controllers/admin';
import { Link } from 'react-router-dom';
import AdminTable from '../shared/AdminTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import NotificationIsCreated from './NotificationIsCreated';
import Modal from './Modal/Modal';
import Backdrop from './Backdrop/Backdrop';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgUsers: [],
      users: [],
      id: 0,
      newUserClicked: false,
      deleteUserClicked: false,
      modalIsOpen: false,
      deleteUser:'',
      ifUserDeleted:false,
    }
  }

  showModal = () => {

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
  }
  deleteUser = async (username) => {
    try {
      await deleteUser(username);
      this.setState({ifUserDeleted:true})
      console.log(this.state.ifUserDeleted); 
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
      roles: user.roles.map(role => role.name).join(', '),
      actions: [
        <button type="button" key={user.id + "edit"} title="Edit" className="btn btn-outline float-left "><Link to={`/edit_user/${user.id}`} ><FontAwesomeIcon className="fa-lg " icon={faEdit}> </FontAwesomeIcon></Link></button>,
        <button type="button" key={user.id + "delete"} title="Delete" className="btn  btn-outline float-left" onClick={() => this.ifClickedDeleteUser(user.username)}><FontAwesomeIcon className="fa-lg " icon={faTrash}></FontAwesomeIcon></button>,
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

    if(this.state.ifUserDeleted){
      console.log(this.state.ifUserDeleted);
      return(
        <NotificationIsCreated ifUserDeleted = {this.state.ifUserDeleted}/>
      )
    }
    if (this.state.modalIsOpen) {
      return (
        <div>
          <Modal show={this.state.modalIsOpen} closed={this.closeModal} clickDeleteUser={this.clickDeleteUser} />
          <Backdrop show={this.state.modalIsOpen} />
        </div>
      )
    }
 
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
                <AdminTable
                  header={this.tableHeaders}
                  data={this.state.users}
                  sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                  className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ></AdminTable>
              </div>
            </div></div>
        </div>
      </>

    );
  }
}

export default withRouter(AdminDashboard);
