import React from 'react';
import AdminTable from '../shared/AdminTable';
import Joi from 'joi-browser'
import Input from './InputValidation';
import { Redirect, Link } from 'react-router-dom'
import { putUser } from '../../api/controllers/admin';
import { getRolesList } from '../../api/controllers/admin';


export default class EditUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: { name: "", username: "", phone: "", status: "active", password: "" },
            errors: {},
            orgRoles: [],
            roles: [],
            userdata: [],
            userEditedOK: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateData = [];
    }


    tableHeaders = [
        { key: "select", value: "Select Roles", toSort: false, sortOrder: true },
        { key: "selected", value: "Selected Roles", toSort: false, sortOrder: true }
    ];


    renderRedirect = () => {
        this.setState({
            cancelClicked: true
        });
    }

    schema = {
        name: Joi.string().required().label("Name"),
        phone: Joi.string().trim().regex(/[0-9]/).max(10).min(10).label('Phone Number'),
        username: Joi.string().required().email().label("Email"),
        password: Joi.string().min(6).max(20).required().label("password"),
    }
    // isChecked = (event, id) => {
    //     for (let index = 0; index < this.state.roles.length; index++) {
    //         if (this.state.roles[index].id === id) {
    //             console.log("hii")
    //             console.log(event.target.checked)
    //         }
    //     }
    // }

    async componentDidMount() {
        const data = await getRolesList();
        const { roles: userRoles } = this.props.user;
        userRoles.forEach(userRole => this.updateData.push(userRole.id));
        // const selectedRoles = [];
        // for (var i = 0; i < data.length; i++) {
        //     let id = data[i].id;
        //     selectedRoles.push({
        //         rolename: data[i].name,
        //         // select: <input type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, id)}> </input>
        //     })

        // }
        const roles = data.map(role => ({
            role: role.name,
            selected: <input id="checkbox" defaultChecked={userRoles.some(ur => ur.id == role.id)} type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, role.id)}></input>
        }));
        this.setState({
            roles,
            // selectedRoles,
            account: {
                name: this.props.user.name,
                username: this.props.user.username,
                phone: this.props.user.phone
            },
        });

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


    // rolesData = [
    //     { rolename: "Researcher", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
    //     { rolename: "Support", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
    //     { rolename: "Manual QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
    //     { rolename: "Performance QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
    //     { rolename: "Automation QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> }

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

    componentWillReceiveProps(nextProps) {
        this.setState({
            account: {
                name: nextProps.user.name,
                username: nextProps.user.username,
                phone: nextProps.user.phone
            },
            roles: nextProps.user.roles
        });
    }

    handleSumbit = async e => {
        try {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        // if (errors) return;
        const id = this.props.id
        const user = {
            name: this.state.account.name,
            username: this.state.account.username,
            phone: this.state.account.phone,
            roles: this.updateData
        };

            const userUpdated = await putUser(id.id, user);
            this.setState({ userEditedOK: true });
        } catch (error) {
            alert(error);
            console.log(error.msg);
        }
    };

    handleChange = (event, value, id) => {
        if (value === true) {
            this.updateData.push(id);
        } else {
            var index = this.updateData.indexOf(id);
            this.updateData.splice(index, 1);
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
    };

    render() {
        const { account, errors } = this.state;

        if (this.state.userEditedOK) {
            return (
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">User Updated</h1>
                        <p class="lead">Successfully</p>
                        <Link to='/users'>Go back to Users page</Link>
                    </div>
                </div>
            )
        }
        return (
            <>
                {this.state.cancelClicked && <Redirect to='/users' />}
                <form className="ml-3" onSubmit={this.handleSumbit}>
                    <legend className="scheduler-border">Personal info</legend>
                    <div className="form-group mt-2 ml-2">
                        <label htmlFor="firstname"> Name : </label>
                        <Input className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value={this.state.account.name}
                            onChange={this.handleInputChange}
                            error={errors.name}
                        />
                    </div>

                    <div className="form-group ml-2">
                        <label htmlFor="Rphone">Phone :</label>
                        <Input className="form-control"
                            type="text"
                            id="phone"
                            name="phone"
                            value={this.state.account.phone}
                            onChange={this.handleInputChange}
                            error={errors.phone} />
                    </div>
                    <legend className="scheduler-border">User info</legend>
                    <div className="form-group ml-2">
                        <label htmlFor="Remail">Email address :</label>
                        <input className="form-control"
                            disabled="true"
                            type="email"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="name@example.com"
                            value={this.state.account.username}
                            error={errors.username}
                            readOnly={true}
                        />
                        <small className="form-text text-muted">This will be used as username.</small>
                    </div>
                    <p className="ml-2">Select role :</p>

                    <AdminTable
                        header={this.tableHeaders}
                        data={this.state.roles}
                        sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</AdminTable>

                    <button className="btn btn-secondary btn-block" >Save</button>
                    <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>

                </form>
            </>
        );
    }
}