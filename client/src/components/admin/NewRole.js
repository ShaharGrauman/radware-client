import React from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import PermissionsTable from './PermissionsTable';
import { postNewRole } from '../../api/controllers/admin';
import { getRoleWithId } from '../../api/controllers/admin';
import Joi from 'joi-browser'
import Input from './input';
import NotificationIsCreated from './NotificationIsCreated';

class NewRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account:{
            rolename: null,
            description: null},
            permissions: [],
            cancelClicked: false,
            errors: {},
            id:[],
            role:[],
            isNewRole : true,  
            ifRoleCreated: false
        };
    }




    schema = {
        rolename: Joi.string().required().label("rolename"),
        description: Joi.string().required().label("description")
        
     
    }

    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.account, this.schema, options);

        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;

    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;
    }



    renderRedirect = () => {
        this.setState({

            cancelClicked: true
        });
    }

    registerClick = async e => {
        try {
            e.preventDefault();
            const errors = this.validate();
              //method return object looks like error 
            this.setState({ errors: errors || {} });
            console.log(this.state.errors)
           // if (errors) return;

        let dataRole = {
            name: this.state.account.rolename,
            description: this.state.account.description,
            permissions: this.state.permissions
        }
        //If validations correct:
      
        if(this.state.permissions.length > 0){
            await postNewRole(dataRole);
            this.setState({ ifRoleCreated: true });
        }
       
        //If validation fails:
        //...
    }
        catch (error) {
            alert(error);
        }
    }

    async componentWillMount() {
        const id = this.props.match.params;
        if(id){
        this.setState({id});
        console.log('id : ', id);
        const data = await getRoleWithId(id.id);
        // const {data} = await axios.get(`http://localhost:3001/users/${id.id}`);
        this.setState({ role: data });
        // console.log(this.state.user)
    }
}

handleeChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
    console.log(this.state.account)

};


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
        const { account, errors } = this.state;
        if (this.state.ifRoleCreated) {
            return (
                <NotificationIsCreated page={'Role'} />
            )
        }
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
                                        <Input 
                                        className="form-control" 
                                        name="rolename"
                                         type="text" 
                                         id="fName"
                                         value={account.rolename}
                                         onChange={this.handleeChange}
                                         error={errors.rolename}
                                           />
                                      
                                    </div>

                                    <div className="form-group ml-2">
                                        <label htmlFor="lName">Description : </label>
                                        <Input 
                                        className="form-control" 
                                        name="description" 
                                        type="text" 
                                        id="lName" 
                                        value={account.description}
                                        onChange={this.handleeChange}
                                        error={errors.description}
                                        />
                                      
                                    </div>

                                    <p className="ml-2">Select Permission :</p>
                                    <PermissionsTable onSelect={this.onPermissionSelect} isNew = {this.state.isNewRole}/>
                                    {!this.state.permissions.length && <div class="alert alert-danger" role="alert">
                                    Please select at least 1 permission
                                </div>}
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

export default withRouter(NewRole);