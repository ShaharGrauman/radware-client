import React from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import PermissionsTable from './PermissionsTable';
import { postNewRole } from '../../api/controllers/admin';
import { getRoleWithId } from '../../api/controllers/admin';
import { putRole } from '../../api/controllers/admin';


class EditRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account:{ rolename: '',description: '', permissions: []},
            cancelClicked: false,
            errors: {},
            id:[],
            role:[],
            perId:[]
        };
    }

    renderRedirect = () => {
        this.setState({

            cancelClicked: true
        });
    }

     registerClick = async ()  => {
        let dataRole = {
         name: this.state.account.rolename,
         description:this.state.account.description,
         permissions:this.state.perId

       }
        console.log(dataRole);
       console.log(this.state.id);
       await putRole(this.state.id,dataRole); 


     }



    async componentWillMount() {
        // const id = this.props.match.params;
        console.log("print: ", this.state.account.permissions);
        const id = window.location.pathname.split('/')[2];
        this.setState({id});
        console.log('the id : ', id);
        const role = await getRoleWithId(id);
        let selectedpermissionId = [];
        role.permissions.map(permission => selectedpermissionId.push(permission.id));
        this.setState({perId: selectedpermissionId});
        console.log(this.state.perId);
        // const {data} = await axios.get(`http://localhost:3001/users/${id.id}`);
        console.log("selectedpermissionId: ", selectedpermissionId);
        console.log(role);
        this.setState({ role });
       this.setState({account:{
           rolename:this.state.role.name,
           description:this.state.role.description,
           permissions: this.state.perId
       }})
       console.log(this.state.account);
    }

   


    onChangeHandler = event => {
        const target = event.target;
        console.log("target: ", target);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const unsavedData = { ...this.state, [target.name]: value };
        this.setState(unsavedData);
        console.log("unsavedData ",this.state.unsavedData);
    }
    /* Original */
    // onPermissionSelect = permissionId => {
    //     if (this.state.permissions.includes(permissionId)) {
    //         this.setState({
    //             permissions: [
    //                 ...this.state.permissions.filter(pid => pid != permissionId)
    //             ]
    //         })
    //     } else {
    //         this.setState({
    //             permissions: [...this.state.permissions, permissionId]
    //         });
    //     }
    // }
    onPermissionSelect = permissionId => {
        if (this.state.perId.includes(permissionId)) {
            this.setState({
                perId: [
                    ...this.state.perId.filter(pid => pid != permissionId)
                ]
            })

        } else {
            this.setState({
                perId: [...this.state.perId, permissionId]
            });
        }
    }
    handleeChange = ({ currentTarget: input }) => {
      
        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account });
        console.log(this.state.account)
    };

    render() {
        const { account, errors} = this.state;

        return (
            <>
                <div className="container">
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <h1>Edit Role</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.cancelClicked && <Redirect to='/admin/roles' />}
                            <form className="ml-3" onSubmit={this.handleSumbit}>
                                <fieldset className="scheduler-border">
                                    <legend className="scheduler-border">Role info</legend>

                                    <div className="form-group mt-2 ml-2">
                                        <label htmlFor="rolename">Role Name : </label>
                                        <input className="form-control" 
                                        name="rolename" 
                                        type="text" 
                                        id="fName" 
                                        onChange={this.handleeChange} 
                                        defaultValue={this.state.account.rolename}
                                        error={errors.name}
                                        readOnly = {true}
                                        />
                                        <div> {this.state.errors.rolename && <div className="alert alert-danger">{this.state.errors.rolename}</div>}</div>
                                    </div>

                                    <div className="form-group ml-2">
                                        <label htmlFor="lName">Description : </label>
                                        <input className="form-control"
                                         name="description" 
                                         type="text"
                                          id="lName"
                                          defaultValue={account.description}
                                          error={errors.name}
                                           onChange={this.handleeChange} 
                                           />
                                        <div> {this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}</div>
                                    </div>

                                    <p className="ml-2">Select Permission :</p>
                                    <PermissionsTable
                                     onSelect={this.onPermissionSelect}
                                     role={this.state.role}
                                      />
                                </fieldset>
                                <button type="button"onClick={this.registerClick} className="btn btn-secondary btn-block" >Save</button>
                                <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>

                            </form> 
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(EditRole);