import React from 'react';
import Modal from './Modal/Modal';
import { Link } from 'react-router-dom';
import Backdrop from './Backdrop/Backdrop';
import AdminTable from '../shared/AdminTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoles, deleteRole } from '../../api/controllers/admin';
import { faEdit, faTrash, faUserTag } from '@fortawesome/free-solid-svg-icons';

class RolesDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            orgRoles: [],
            newRoleClicked: false,
            id: 0,
            modalIsOpen: false,
            deleteRole: '',
            errorMsg: ''
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
        if (sortKey.key != "id") {
            if (sortKey.sortOrder)
                sorted = this.state.orgRoles.sort((a, b) => a[sortKey.key].toLowerCase() > b[sortKey.key].toLowerCase() ? 1 : -1);
            else
                sorted = this.state.orgRoles.sort((a, b) => a[sortKey.key].toLowerCase() < b[sortKey.key].toLowerCase() ? 1 : -1);
        }
        else {
            if (sortKey.sortOrder)
                sorted = this.state.orgRoles.sort((a, b) => a[sortKey.key] > b[sortKey.key] ? 1 : -1);
            else
                sorted = this.state.orgRoles.sort((a, b) => a[sortKey.key] < b[sortKey.key] ? 1 : -1);
        }
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
                <button type="button" key={role.id + "delete"} title="Delete" className="btn  btn-outline float-left" onClick={() => this.ifClickedDeleteRole(role.id)}>
                    <FontAwesomeIcon className="fa-lg " icon={faTrash}></FontAwesomeIcon></button>,
            ]
        }));
        this.setState({ orgRoles: roles, roles: roles });
    }

    async deleteRole(id) {
        try {
            const role = await deleteRole(id);
            if (typeof role == 'string') {
                this.setState({
                    errorMsg: role
                });
                const updatedRoles = this.state.roles.filter(function (element) { return element.id != id; });
                this.setState({ roles: updatedRoles })
            }
        } catch (error) {
            this.setState({
                errorMsg: "Internal error, please try again later"
            })
        }
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    ifClickedDeleteRole = (id) => {
        this.setState({
            modalIsOpen: true,
            deleteRole: id
        });

    }

    clickDeleteRole = () => {
        this.deleteRole(this.state.deleteRole);
        this.setState({ modalIsOpen: false })
    }

    tableHeaders = [
        { key: "id", value: "ID", toSort: true, sortOrder: true },
        { key: "name", value: "Role name", toSort: true, sortOrder: true },
        { key: "description", value: "Description", toSort: true, sortOrder: true },
        { key: "permissions", value: "Permissions", toSort: true, sortOrder: true },
        { key: "actions", value: "", toSort: false, sortOrder: true }
    ];

    render() {
        if (this.state.modalIsOpen) {
            return (
                <div>
                    <Modal show={this.state.modalIsOpen} closed={this.closeModal} clickDelete={this.clickDeleteRole} />
                    <Backdrop show={this.state.modalIsOpen} />
                </div>
            )
        }
        return (
            <>
                <div>
                    {this.state.newRoleClicked && <Redirect to='/newrole' />}
                    <div className="row ml-3 mr-3">
                        <div className="col-lg-10 col-md-9 col-sm-6" style={{ fontFamily: "cursive", fontSize: "15px" }}>
                            <h2>Admin Dashboard</h2>
                            <h4>Roles Management</h4>
                        </div>
                        <div className="col ml-3 mb-3 float-right">
                            <button type="button" title="add role" className="btn btn-outline float-right" onClick={() => this.renderRedirect("newrole")}>
                                <FontAwesomeIcon size="3x" icon={faUserTag}></FontAwesomeIcon></button>
                        </div>
                    </div>
                    <div className="ml-2">
                        {
                            this.state.errorMsg && <div className="mb-3 ml-4" style={{ color: "red" }}> {this.state.errorMsg} </div>
                        }
                    </div>
                    <div className="row ml-3 mr-3 mt-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                            <AdminTable
                                header={this.tableHeaders}
                                data={this.state.roles}
                                sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                                className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</AdminTable>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default withRouter(RolesDashboard);