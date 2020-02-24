import React from 'react';
import Table from './RolesDashboard';
import AdminTable from '../shared/AdminTable';
import Joi from 'joi-browser'
import Input from './InputValidation';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { getRolesList, postNewUser } from '../../api/controllers/admin';
import NotificationIsCreated from './NotificationIsCreated';
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifUserCreated: false,
            account: { name: "", username: "", phone: "", password: "" },
            errors: {},
            orgRoles: [],
            roles: [],
            selectedRoles: [],
            checkBoxError: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateData = []
    }
    tableHeaders = [
        { key: "select", value: "Select Roles", toSort: false, sortOrder: true },
        { key: "selected", value: "Selected Roles", toSort: false, sortOrder: true }]
    renderRedirect = () => {
        this.setState({
            cancelClicked: true
        });
    }
    schema = {
        name: Joi.string().required().label("Firstname"),
        //lastname: Joi.string().required().label("Lastname"),
        phone: Joi.string().trim().regex(/[0-9]/).max(10).min(10).label('Phone Number'),
        username: Joi.string().required().email().label("Email"),
        // password: Joi.string().required().min(5).alphanum().label("Password"),
        password: Joi.string().min(6).max(20).required().label("password")
        
     
    }
    async componentDidMount() {
        const data = await getRolesList();
        const tempData = [];
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            let id = data[i].id;
            // console.log(id);
            tempData.push({
                rolename: data[i].name,
                select: <input type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, id)}> </input>
            })
        }
        console.log('tempData')
        console.log(tempData)
        this.setState({ selectedRoles: tempData })
        const roles = data.map(role => ({
            role: role.name,
            selected: <input type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, role.id)}></input>
        }));
        this.setState({ roles });
    }
     valthischeckBox = ()=> {
    var checkboxs=document.getElementsByName("myTextEditBox");
   
    for(var i=0,l=checkboxs.length;i<l;i++)
    {
        if(checkboxs[i].checked)
        {   this.setState({checkBoxError:false})
            return true;
            
            break;
        }
    }
    this.setState({checkBoxError:true})
    return false; 
   
}
    onRoleSelect = roleId => {
        if (this.state.roles.includes(roleId)) {
            this.setState({
                roles: [
                    ...this.state.roles.filter(pid => pid != roleId)
                ]
            })
        } else {
            this.setState({
                roles: [...this.state.roles, roleId]
            });
        }
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
    componentWillReceiveProps(nextProps) {
        this.setState({
            account: {
                name: nextProps.user.name,
                username: nextProps.user.username,
                phone: nextProps.user.phone
            }
        })
    }
    handleSumbit = async e => {
        try {
            e.preventDefault();
            const errors = this.validate();
              //method return object looks like error 
            this.setState({ errors: errors || {} });   //we render the object errors  in the setstate 
            // if (!errors) return null;
            console.log('account : ', this.state.account)
            if (this.valthischeckBox())  {  
            let user = {
                name: this.state.account.name,
                username: this.state.account.username,
                phone: this.state.account.phone,
                password: this.state.account.password,
                roles: this.updateData
            };
           
            console.log('updateData', this.updateData);
            console.log('error : ', errors);
            if (errors) return;
            console.log(this.state.ifUserCreated);
            // const user = await login(this.state.username, this.state.password);
            // this.setState({ ifUserCreated: true });
            const newUser = await postNewUser(user);
            this.setState({ ifUserCreated: true });
        } }
        catch (error) {
            alert(error);
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
handleChange = (event, value, id) => {
    if (value === true) {
        this.updateData.push(id);
        // console.log('aaaa');
        // console.log(this.updateData);
    } else {
        var index = this.updateData.indexOf(id);
        this.updateData.splice(index, 1);
        console.log(this.updateData)
    }
}
render() {
    const { account, errors } = this.state;
    if (this.state.ifUserCreated) {
        return (
            <NotificationIsCreated page={'User'} />
        )
    }
    return (
        <>
            {this.state.cancelClicked && <Redirect to='/users' />}
            <form className="ml-3" onSubmit={this.handleSumbit}>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border font-weight-light">Personal info</legend>
                    <div className="form-group mt-2 ml-2">
                        <label htmlFor="firstname"> Name : </label>
                        <Input className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value={account.name}
                            onChange={this.handleeChange}
                            error={errors.name}
                        />
                    </div>
                    <div className="form-group ml-2">
                        <label htmlFor="Rphone">Phone :</label>
                        <Input className="form-control"
                            type="text"
                            id="phone"
                            name="phone"
                            value={account.phone}
                            onChange={this.handleeChange}
                            error={errors.phone} />
                    </div>
                </fieldset>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border font-weight-light">User info</legend>
                    <div className="form-group ml-2">
                        <label htmlFor="Remail">Email address :</label>
                        <Input className="form-control"
                            type="email"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="name@example.com"
                            defaultValue={account.username}
                            onChange={this.handleeChange}
                            error={errors.username}
                        />
                        <small className="form-text text-muted">This will be used as username.</small>
                    </div>
                    <div className="form-group ml-2">
                        <label htmlFor="PassReg">Password :</label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            value={account.password}
                            onChange={this.handleeChange}
                            error={errors.password}
                            ref="password"
                        />
                    </div>
                    <p className="ml-2">Select role :</p>
                    <AdminTable
                        onSelect={this.onRoleSelect}
                        header={this.tableHeaders}
                        // data={this.rolesData}
                        data={this.state.roles}
                        sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</AdminTable>
                         {
                  this.state.checkBoxError && <div class="alert alert-danger" role="alert">
                   Must choose at least one role 
                    </div>
                }
                </fieldset>
                <button className="btn btn-secondary btn-block" >Save</button>
                <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>
            </form>
        </>
    );
}
}