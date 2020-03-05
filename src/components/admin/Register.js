import React from 'react';
import Joi from 'joi-browser';
import Input from './InputValidation';
import { Redirect } from 'react-router-dom'
import AdminTable from '../shared/AdminTable';
import NotificationIsCreated from './NotificationIsCreated';
import { getRolesList, postNewUser } from '../../api/controllers/admin';

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
        { key: "selected", value: "Selected Roles", toSort: false, sortOrder: true }
    ]

    renderRedirect = () => {
        this.setState({
            cancelClicked: true
        });
    }

    schema = {
        name: Joi.string().required().label("Firstname"),
        phone: Joi.string().trim().regex(/^[0-9]{10}$/).max(10).min(10).label('Phone Number'),
        username: Joi.string().required().email().label("Email"),
        password: Joi.string().min(6).max(20).required().label("password")
    }

    async componentDidMount() {
        try {
            const data = await getRolesList();
            const tempData = [];
            for (var i = 0; i < data.length; i++) {
                let id = data[i].id;
                tempData.push({
                    rolename: data[i].name,
                    select: <input type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, id)}> </input>
                })
            }
            this.setState({ selectedRoles: tempData })
            const roles = data.map(role => ({
                role: role.name,
                selected: <input type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, role.id)}></input>
            }));
            this.setState({ roles });
        } catch (error) {
            this.setState({
                errors: "Internal error, please try again later"
            })
        }
    }

    valthischeckBox = () => {
        var checkboxs = document.getElementsByName("myTextEditBox");
        for (var i = 0, l = checkboxs.length; i < l; i++) {
            if (checkboxs[i].checked) {
                this.setState({ checkBoxError: false })
                return true;
            }
        }
        this.setState({ checkBoxError: true })
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
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema)
        return error ? error.details[0].message : null;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
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
            this.setState({ errors: errors || {} });
            if (this.valthischeckBox()) {
                let user = {
                    name: this.state.account.name,
                    username: this.state.account.username,
                    phone: this.state.account.phone,
                    password: this.state.account.password,
                    roles: this.updateData
                };
                if (errors) return;
                const newUser = await postNewUser(user);
                if (typeof newUser == 'string') {
                    this.setState({
                        errors: newUser
                    });
                    return;
                }
                this.setState({ ifUserCreated: true });
            }
        }
        catch (error) {
            this.setState({
                errors: "Internal error, please try again later"
            })
        }
    }

    handleInputChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
    }

    handleChange = (event, value, id) => {
        if (value === true) {
            this.updateData.push(id);
        } else {
            var index = this.updateData.indexOf(id);
            this.updateData.splice(index, 1);
        }
    }

    render() {
        const { account, errors } = this.state;
        if (this.state.ifUserCreated) {
            return (
                <NotificationIsCreated ifUserCreated={this.state.ifUserCreated} />
            )
        }
        return (
            <>
                <div className="container">
                    {this.state.cancelClicked && <Redirect to='/users' />}
                    <div className="row mt-2">
                        <div className="col-6 ml-4" style={{ fontFamily: "cursive", fontSize: "30px" }} >
                            <h1>New User</h1>
                        </div>
                    </div>
                    <form className="ml-3" onSubmit={this.handleSumbit}>
                        <h4 className="scheduler-border font-weight-light pb-2 ml-2 " style={{ fontFamily: "cursive", fontSize: "20px" }}><u>Personal info</u></h4>
                        <div className="form-group ml-2">
                            <label htmlFor="firstname"> Name : </label>
                            <Input className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={account.name}
                                onChange={this.handleInputChange}
                                error={errors.name}
                            />
                        </div>
                        <div className="form-group ml-2">
                            <label htmlFor="Rphone">Phone :</label>
                            <Input
                                type="text"
                                id="phone"
                                name="phone"
                                value={account.phone}
                                onChange={this.handleInputChange}
                                error={errors.phone} />
                        </div>

                        <h4 className="scheduler-border font-weight-light pb-2 ml-2" style={{ fontFamily: "cursive", fontSize: "20px" }}><u>User info</u></h4>
                        <div className="form-group ml-2">
                            <label htmlFor="Remail">Email address :</label>
                            <Input className="form-control"
                                type="email"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="name@example.com"
                                defaultValue={account.username}
                                onChange={this.handleInputChange}
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
                                onChange={this.handleInputChange}
                                error={errors.password}
                                ref="password"
                            />
                        </div>
                        <p className="ml-2">Select role :</p>
                        <AdminTable
                            onSelect={this.onRoleSelect}
                            header={this.tableHeaders}
                            data={this.state.roles}
                            sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</AdminTable>
                        {
                            this.state.checkBoxError && <div className="mb-3" style={{ color: "red" }}>
                                Must choose at least one role
                            </div>
                        }
                        {
                            this.state.errors.length && <div className="mb-3" style={{ color: "red" }}>
                                {this.state.errors}
                            </div>
                        }
                        <button className="btn btn-secondary btn-block" >Save</button>
                        <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>
                    </form>
                </div>
            </>
        );
    }
}