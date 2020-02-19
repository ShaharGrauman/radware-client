
import React from 'react';
import Table from './RolesDashboard';
import MyTable from '../shared/MyTable';
import Joi from 'joi-browser'
import Input from './input';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import {getRolesNew, postNewUser} from '../../api/controllers/admin';
export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ifUserCreated: false,
            account: { name: "", username: "", phone: "", password: "" },
            errors: {},
            orgRoles: [],
            roles: [],
            selectedRoles: []
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
        password: Joi.string().min(6).max(20).required().label("password"),


    }

    // async componentDidMount() {
    //     const { data } = await axios.get(`http://localhost:3001/users/roles`);
    //     const tempData = [];

    //     for (var i = 0; i < data.length; i++) {
    //         let id = data[i].id;
    //         // console.log(id);
    //         tempData.push({
    //             rolename: data[i].name,
    //             select: <input type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, id)}> </input>
    //         })

    //     }
    //     console.log('tempData')
    //     console.log(tempData)
    //     this.setState({ selectedRoles: tempData })
    //     const roles = data.map(role => ({
    //         role: role.name,
    //         selected: <input type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, role.id)}></input>
    //     }));

    //     this.setState({ roles });
    // }
    async componentDidMount() {
        const  data  = await getRolesNew();
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

    // componentDidMount() {
    //     this.setState({
    //         select: [
    //             { id: "1", rolename: "Researcher", selected: false },
    //             { id: "2", rolename: "Support", selected: false },
    //             { id: "3", rolename: "Manual QA", selected: false },
    //             { id: "4", rolename: "Performance QA", selected: false },
    //             { id: "5", rolename: "Automation QA", selected: false }

    //         ]
    //     });
    // }

    // roleChecked(roleId) {
    //     const selectedRole = this.state.select.find(role => role.id == roleId);
    //     selectedRole.selected = !selectedRole.selected;
    //     console.log(selectedRole);
    //     this.setState({ selectedRoles: [selectedRole.id] })
    //     console.log(this.state.selectedRoles);
    //     this.setState({
    //         select: [
    //             ...this.state.select
    //             ,
    //             selectedRole
    //         ]
    //     })
    //     // console.log(this.state.select)
    // }

    // rolesData = [
    //     { id: "1", rolename: "Researcher", selected: <input type="checkbox" onChange={() => this.roleChecked(1)} /> },
    //     { id: "2", rolename: "Support", selected: <input type="checkbox" onChange={() => this.roleChecked(2)} /> },
    //     { id: "3", rolename: "Manual QA", selected: <input type="checkbox" onChange={() => this.roleChecked(3)} /> },
    //     { id: "4", rolename: "Performance QA", selected: <input type="checkbox" onChange={() => this.roleChecked(4)} /> },
    //     { id: "5", rolename: "Automation QA", selected: <input type="checkbox" onChange={() => this.roleChecked(5)} /> }

    // ];

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

    handleSumbit = async e => {
        e.preventDefault();
        const errors = this.validate();            //method return object looks like error 
        this.setState({ errors: errors || {} });   //we render the object errors  in the setstate 
        // if (!errors) return null;
        console.log('account : ',this.state.account)
        let user = {
            name: this.state.account.name,
            username: this.state.account.username,
            phone: this.state.account.phone,
            password: this.state.account.password,
            roles: this.updateData
        };
        // const selectedRoles = this.state.roles.map(role => {
        //     console.log(role.selected);
        // })
        // console.log(selectedRoles);

        console.log('updateData' , this.updateData);
        console.log('error : ', errors);
        if(errors) return;
        console.log(this.state.ifUserCreated);
        // const user = await login(this.state.username, this.state.password);
        
          await postNewUser(user); 

        
       
        // axios.post('http://localhost:3001/users/new_user', user)
        //     .then(response => {
        //         this.setState({ ifUserCreated: true });
        //         console.log(response)
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    };

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
        // if (this.state.ifUserCreated) {
        //     return (
        //         <NotificationIsCreated />
        //     )
        // }
        return (
            <>
                {this.state.cancelClicked && <Redirect to='/users' />}
                <form className="ml-3" onSubmit={this.handleSumbit}>
                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">Personal info</legend>
                        <div className="form-group mt-2 ml-2">
                            <label htmlFor="firstname"> name : </label>
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
                        <legend className="scheduler-border">User info</legend>
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
                            <small id="passwordHelp" className="form-text text-muted">Must be 6 at least 6 letters.</small>
                        </div>

                        <p className="ml-2">Select role :</p>
                        <MyTable
                            onSelect={this.onRoleSelect}
                            header={this.tableHeaders}
                            // data={this.rolesData}
                            data={this.state.roles}
                            sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</MyTable>
                    </fieldset>
                    <button className="btn btn-secondary btn-block" >Save</button>
                    <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>
                </form>
            </>
        );
    }
}