import React from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import PermissionsTable from './PermissionsTable';
import { postNewRole } from '../../api/controllers/admin';


export default class NewRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rolename: null,
            description: null,
            permissions: [],
            cancelClicked: false,
            errors: {}
        };
    }

    renderRedirect = () => {
        this.setState({

            cancelClicked: true
        });
    }

     registerClick = async e  => {
        let dataRole = {
            name: this.state.rolename,
            description: this.state.description,
            permissions: this.state.permissions

        }
        console.log(dataRole);
        // axios.post('http://localhost:3001/role/new_role', dataRole);
        await postNewRole(dataRole); 


    }


    onChangeHandler = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const unsavedData = { ...this.state, [target.name]: value };
        this.setState(unsavedData);
    }

    onPermissionSelect = permissionId => {
        if (this.state.permissions.includes(permissionId)) {
            this.setState({
                permissions: [
                    ...this.state.permissions.filter(pid => pid != permissionId)
                ]
            })
        } else {
            this.setState({
                permissions: [...this.state.permissions, permissionId]
            });
        }
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <h1>New Role</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.cancelClicked && <Redirect to='/admin/roles' />}
                            <form className="ml-3" onSubmit={this.onSubmit}>
                                <fieldset className="scheduler-border">
                                    <legend className="scheduler-border">Role info</legend>

                                    <div className="form-group mt-2 ml-2">
                                        <label htmlFor="rolename">Role Name : </label>
                                        <input className="form-control" name="rolename" type="text" id="fName" onChange={this.onChangeHandler} required />
                                        <div> {this.state.errors.rolename && <div className="alert alert-danger">{this.state.errors.rolename}</div>}</div>
                                    </div>

                                    <div className="form-group ml-2">
                                        <label htmlFor="lName">Description : </label>
                                        <input className="form-control" name="description" type="text" id="lName" onChange={this.onChangeHandler} />
                                        <div> {this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}</div>
                                    </div>

                                    <p className="ml-2">Select Permission :</p>
                                    <PermissionsTable onSelect={this.onPermissionSelect} />
                                </fieldset>
                                <button type="button" onClick={this.registerClick} className="btn btn-secondary btn-block" >Save</button>
                                <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>

                            </form> 
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

