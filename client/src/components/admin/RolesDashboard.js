import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import MyTable from '../shared/MyTable';

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
        if (this.state.isSorted) {
            sorted = [].concat(this.state.orgRoles).sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);
        }
        else {
            sorted = [].concat(this.state.orgRoles).sort((a, b) => a[sortKey] < b[sortKey] ? 1 : -1);
        }
        this.setState({ roles: sorted, isSorted: !this.state.isSorted })
    }


    componentDidMount() {
        axios.get(`http://localhost:3001/roles`, (req, res) => res.json()
        ).then(res => {
            const data = res.data;
              this.setState({ roles: data, orgRoles: data });
            });
      }

    tableHeaders = ['ID', 'Rolename', 'Permissions'];

    render() {
        return (
            <>
                <div>
                    {this.state.usersManagementClicked && <Redirect to='/admin' />}
                    {this.state.newRoleClicked && <Redirect to='/newrole' />}

                    <div className="ml-3 mb-3">
                        <h2>Admin Dashboard</h2>
                        <h4>Roles` Management</h4>
                    </div>
                    <div className="ml-2 mb-3">
                        <button type="button"
                            onClick={() => this.renderRedirect("newrole")}
                            className="ml-2 mr-4 btn btn-secondary">New role</button>
                        <button type="button"
                            onClick={() => this.renderRedirect("usersmanagement")}
                            className="btn btn-secondary">Users Managment</button>
                    </div>

                    <div className="ml-3 mr-3">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                                <MyTable
                                    header={this.tableHeaders}
                                    data={this.state.roles}
                                    key={this.state.roles.ID}
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

