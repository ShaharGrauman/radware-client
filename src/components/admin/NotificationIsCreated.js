import React from 'react';
// import 'animate.css';
import 'react-notifications-component/dist/theme.css';
import { Redirect, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export default class NotificationIsCreated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRolesClicked: false,
            isAdminClicked: false,
        }
    }

    isclickNew = () => {
        this.setState({ isRolesClicked: true })
    }

    isclickAdmin = () => {
        this.setState({ isAdminClicked: true })
    }

    render() {
        return (
            <div className="container">
                <div className="row align-items-center  border border-danger p-4">
                    <div className="col-md-3 mt-3 mb-2"></div>
                    <div className="col-md-12 mb-4 text-center">
                        {
                            this.props.userEditedOK ?
                                <div className="alert alert-success text-center">
                                    <i><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon></i>
                                    <strong className="ml-2">user updated successfully</strong>
                                </div> : null
                        }
                        {
                            this.props.ifUserDeleted ?
                                <div className="alert alert-success text-center">
                                    <i><FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon></i>
                                    <strong className="ml-2">User deleted successfully</strong>
                                </div> : null
                        }
                        {
                            this.props.ifUserCreated ?
                                <div className="alert alert-success text-center">
                                    <i><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon></i>
                                    <strong className="ml-2">User created successfully</strong>
                                </div> : null
                        }
                        {
                            this.props.ifRoleCreated ?
                                <div className="alert alert-success text-center">
                                    <i><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon></i>
                                    <strong className="ml-2">Role created successfully</strong>
                                </div> : null
                        }
                        {
                            this.props.ifRoleUpdated ?
                                <div className="alert alert-success text-center">
                                    <i><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon></i>
                                    <strong className="ml-2">Role updated successfully</strong>
                                </div> : null
                        }
                        <div>
                            <button type="button" className="btn btn-outline-secondary btn-block mb-3" onClick={this.isclickAdmin}>Admin dashboard</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-primary btn-block mb-3" onClick={this.isclickNew}>Roles dashboard</button>
                        </div>
                    </div>

                    <div>
                        {this.state.isAdminClicked && <Redirect to='/users' />}
                        {this.state.isRolesClicked && <Redirect to='/admin/roles' />}
                    </div>
                </div>
            </div>
        )
    }
}