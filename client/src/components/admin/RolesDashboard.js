import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserTag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import MyTable from '../shared/AdminTable';
import { getRoles } from '../../api/controllers/admin';

class RolesDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            orgRoles: [],
            newRoleClicked: false,
            id: 0
        }
    }
    renderRedirect = page => {
        if (page === "newrole") {
            this.setState({
                newRoleClicked: true
            });
        }
    }

    SortByKey(sortKey) {
        let sorted;
        if (sortKey.sortOrder)
            sorted = this.state.orgRoles.sort((a, b) => a[sortKey.key] > b[sortKey.key] ? 1 : -1);
        else
            sorted = this.state.orgRoles.sort((a, b) => a[sortKey.key] < b[sortKey.key] ? 1 : -1);
        sortKey.sortOrder = !sortKey.sortOrder;
        this.setState({ roles: sorted })
    }

    async componentDidMount() {
        const rolesPermission = await getRoles();
        const roles = rolesPermission.map(role => ({
            ...role,
            permissions: role.permissions.map(permission => permission.name).join(' ,'),
            actions: [
                <button type="button" key={role.id + "edit"} title="Edit" className="btn btn-outline float-left ">
                    <Link to={`/editrole/${role.id}`} params={role.id}><FontAwesomeIcon className="fa-lg "
                        icon={faEdit}> </FontAwesomeIcon></Link></button>,
                <button type="button" key={role.id + "delete"} title="Delete" className="btn  btn-outline float-left" ><FontAwesomeIcon className="fa-lg " icon={faTrash}></FontAwesomeIcon></button>,
            ]
        }));
        this.setState({ orgRoles: roles, roles: roles });
    };

    tableHeaders = [
        { key: "id", value: "ID", toSort: true, sortOrder: true },
        { key: "name", value: "Role name", toSort: true, sortOrder: true },
        { key: "description", value: "Description", toSort: true, sortOrder: true },
        { key: "permissions", value: "Permissions", toSort: true, sortOrder: true },
        { key: "actions", value: "", toSort: false, sortOrder: true }
    ];

    render() {
        return (
            <>
                <div>
                    {this.state.newRoleClicked && <Redirect to='/newrole' />}
                    <div className="row">
                        <div className="col-md-11 col-sm-11 col-11">
                            <div className="ml-3 mb-3">
                                <h2>Admin Dashboard</h2>
                                <h4>Roles` Management</h4>
                            </div>
                        </div>
                        <div className="ml-3 mb-4">
                            <button type="button" title="add role" className="btn btn-outline float-left" onClick={() => this.renderRedirect("newrole")}>
                                <FontAwesomeIcon size="3x" icon={faUserTag}></FontAwesomeIcon></button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mr-3 mb-4"></div>
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
export default withRouter(RolesDashboard);
