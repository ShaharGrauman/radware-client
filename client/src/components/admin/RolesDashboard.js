import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faWindowClose, faEdit, faCalculator, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import MyTable from '../shared/MyTable';
import Table from '../shared/Table';

export default class RolesDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            orgRoles: [],
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
        if (page === "usersmanagement") {
            this.setState({
                usersManagementClicked: true
            });
        }
    }

    SortByKey(sortKey) {
        let sorted;
        if (sortKey.sortOrder) 
            sorted = this.state.orgRoles.sort((a, b) => a[sortKey.key] > b[sortKey.key] ? 1 : -1);

        else 
            sorted = this.state.orgRoles.sort((a, b) => a[sortKey.key] < b[sortKey.key] ? 1 : -1);
        sortKey.sortOrder= !sortKey.sortOrder;
        this.setState({ roles: sorted })
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/admin/roles`, (req, res) => res.json()
        ).then 
        (res => {
            
                const roles = res.data.map(role => ({
                    ...role, 
                    permissions: role.permissions.map(permission => permission.name).join(' ,'),
                    actions: [
                        <button type="button" title="Edit" class="btn btn-outline float-left ">
                            <Link to={`/newrole/${role.id}`}><FontAwesomeIcon className="fa-lg" icon={faEdit}></FontAwesomeIcon>
                            </Link>
                        </button>,
                        <button type="button" title="Delete" class="btn  btn-outline float-right" >
                            <FontAwesomeIcon className="fa-lg " icon={faTrash}></FontAwesomeIcon></button>,
                        ]
                  }));
          
                  this.setState({ orgRoles: roles, roles: roles });
                });
        }
           

    tableHeaders = [{key: "id", value: "ID", toSort: true, sortOrder: true},
  {key: "name", value: "Role name", toSort: true, sortOrder: true},
  {key: "description", value: "Description", toSort: true, sortOrder: true},
  {key: "permissions", value: "Permissions", toSort: true, sortOrder: true},
  {key: "actions", value: "", toSort: false, sortOrder: true}

];

    render() {
        return (
            <>
                <div>
                    {this.state.usersManagementClicked && <Redirect to='/users' />}
                    {this.state.newRoleClicked && <Redirect to='/newrole' />}

                    <div className="ml-3 mb-3">
                        <h2>Admin Dashboard</h2>
                        <h4>Roles` Management</h4>
                    </div>
                    <div className="ml-2 mb-3">
                        <button type="button"
                                     className="ml-2 mr-4 btn btn-secondary"
                            onClick={() => this.renderRedirect("newrole")}
                            className="ml-2 mr-4 btn btn-secondary">New role</button>
                        <button type="button" 
                            onClick={() => this.renderRedirect("usersmanagement")}
                            className="btn btn-secondary">Users Managment</button>
                    </div>

                    <div className=" ml-3 mr-3">

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                <MyTable 
                                    header={this.tableHeaders}
                                    data={this.state.roles}
                                    sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</MyTable>
                            </div>
                        </div>
                    </div>


                </div>
            </>

        );
    }



}

