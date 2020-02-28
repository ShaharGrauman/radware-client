

import React from 'react';
import Table from './RolesDashboard';
import AdminTable from '../shared/AdminTable';
import Joi from 'joi-browser'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import { putUser } from '../../api/controllers/admin';
import { getRolesList } from '../../api/controllers/admin';
import Input from './InputValidation';
import NotificationIsCreated from './NotificationIsCreated';

export default class EditUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: { name: "", username: "", phone: "", status: "active", password: "" },
            errors: {},
            orgRoles: [],
            roles: [],
            userdata: [],
            userEditedOK: false,
            checkBoxError: false

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
        phone: Joi.string().trim().regex(/^[0-9]{10}$/).max(10).min(10).label('Phone Number'),
        username: Joi.string().required().email().label("Email"),

      //  password: Joi.string().min(6).max(20).required().label("password"),
    }
    isChecked = (event, id) => {
        for (let index = 0; index < this.state.roles.length; index++) {
            if (this.state.roles[index].id === id) {
                console.log("hii")
                console.log(event.target.checked)
            }
        }
    }

    async componentDidMount() {
        const data = await getRolesList();
        const { roles: userRoles } = this.props.user;
        userRoles.forEach(userRole => this.updateData.push(userRole.id));
        console.log("this.updateData ", this.updateData);
        // arr = arr.push(userRoles.map(userRole => console.log("user Role id: ", userRole.id)));
        //this.setState(this.state.updateData= userRoles.id)
        // console.log(this.state.updateData)
        const selectedRoles = [];
        for (var i = 0; i < data.length; i++) {
            let id = data[i].id;
            console.log(id);
            selectedRoles.push({
                rolename: data[i].name,
                // select: <input type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, id)}> </input>
            })

        }
        console.log('tempData')
        console.log(selectedRoles)

        const roles = data.map(role => ({
            role: role.name,
            selected: <input id="checkbox" defaultChecked={userRoles.some(ur => ur.id == role.id)} type="checkbox" name="myTextEditBox" onChange={event => this.handleChange(event, event.target.checked, role.id)}></input>
        }));
        this.setState({
            roles,
            selectedRoles,

            account: {
                name: this.props.user.name,
                username: this.props.user.username,
                phone: this.props.user.phone
            },
        });
        console.log(selectedRoles);
        console.log({ roles });

    }

    onRoleSelect = roleId => {
        if (this.state.roles.includes(roleId)) {
            console.log('here')

            this.setState({
                roles: [
                    ...this.state.roles.filter(pid => pid != roleId)
                ]
            })
        } else {
            console.log('not here')

            this.setState({
                roles: [...this.state.roles, roleId]
            });
        }
    }


    rolesData = [
        { rolename: "Researcher", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Support", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Manual QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Performance QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Automation QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> }

    ];



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

        console.log('nextProps', nextProps);

        this.setState({
            account: {
                name: nextProps.user.name,
                username: nextProps.user.username,
                phone: nextProps.user.phone
            },
            roles: nextProps.user.roles
        });
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

    handleSumbit = async e => {
        console.log('handle');
        console.log(this.updateData);
        // console.log('roles: ', this.state.roles);
        e.preventDefault();
        const errors = this.validate();//method return object looks like error 
        this.setState({ errors: errors || {} });//we render the object errors  in the setstate 
     console.log(this.state.errors);
        const id = this.props.id
        console.log("updsteData: ", this.updateData);
 
      
       
        const user = {
            name: this.state.account.name,
          ///  status:this.state.account.status,
            username: this.state.account.username,
            phone: this.state.account.phone,
            // password: this.state.account.password,
            roles: this.updateData
        
        };
    
     if(errors) return
        if(this.valthischeckBox()){
    
        try {
            const userUpdated = await putUser(id.id, user);
            if(typeof userUpdated == 'string'){
                this.setState({
                  errors: user
                });  
                console.log("errors in : ",this.state.errors)
                return;
              }
            this.setState({ userEditedOK: true });
        
        
            console.log("the user: ", user);
        
            console.log("the userUpdated: ", userUpdated);
        
         }  catch (error) {
            alert(error);
        }}


      
    };
    handleChange = (event, value, id) => {
        if (value === true) {
            this.updateData.push(id);
            console.log('aaaa');
            console.log(this.updateData);
        } else {
            var index = this.updateData.indexOf(id);
            this.updateData.splice(index, 1);
            console.log(this.updateData)
        }
    }

    handleeChange = ({ currentTarget: input }) => {
// =======
//     handleSumbit = async e => {
//         try {
//         e.preventDefault();
//         const errors = this.validate();
//         this.setState({ errors: errors || {} });
//         // if (errors) return;
//         const id = this.props.id
//         const user = {
//             name: this.state.account.name,
//             username: this.state.account.username,
//             phone: this.state.account.phone,
//             roles: this.updateData
//         };

//             const userUpdated = await putUser(id.id, user);
//             this.setState({ userEditedOK: true });
//         } catch (error) {
//             alert(error);
//             console.log(error.msg);
//         }
//     };

//     handleChange = (event, value, id) => {
//         if (value === true) {
//             this.updateData.push(id);
//         } else {
//             var index = this.updateData.indexOf(id);
//             this.updateData.splice(index, 1);
//         }
//     }

//     handleInputChange = ({ currentTarget: input }) => {
// >>>>>>> master
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
        console.log(this.state.account)
    };



    render() {
        const { account, errors } = this.state;
        if (this.state.userEditedOK) {
            console.log(this.state.userEditedOK)
            return(
                <NotificationIsCreated userEditedOK = {this.state.userEditedOK}/>
                )
        }
        return (
            <>
                {this.state.cancelClicked && <Redirect to='/users' />}
                <div className="row mt-2">
                        <div className="col-md-12 ml-4 "style = {{fontFamily:"cursive",fontSize:"30px" }}>
                            <h1>Edit User</h1>
                        </div>
                    </div>
                <form className="ml-3" onSubmit={this.handleSumbit}>


                    <fieldset className="scheduler-border">
                        <h4 className="scheduler-border font-weight-light pb-2 ml-2"><u>Personal info</u></h4>
                        <div className="form-group mt-2 ml-2">
                            <label htmlFor="firstname"> Name : </label>
                            <Input className="form-control"
                                type="text"
                                id="name"
                                name="name"
                                value={this.state.account.name}
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
                                value={this.state.account.phone}
                                onChange={this.handleeChange}
                                error={errors.phone} />
                        </div>
                    </fieldset>


                    <fieldset className="scheduler-border">
                        <h4 className="scheduler-border font-weight-light pb-2 ml-2"><u>User info</u></h4>
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
                                // onChange={this.handleeChange}
                                error={errors.username}
                                readOnly = {true}
                            />
                            <small className="form-text text-muted">This will be used as username.</small>
                        </div>
                        {/* 
                        <div className="form-group ml-2">
                            <label htmlFor="PassReg">Password :</label>
                            <Input

                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={this.props.user.password}
                                onChange={this.handleChange}
                                disabled
                                error={errors.password}
                                ref="password"
                            />
                            <small id="passwordHelp" className="form-text text-muted">Must be 6 at least 6 letters.</small>
                        </div> */}


                        <p className="ml-2">Select role :</p>


                        <AdminTable
                            header={this.tableHeaders}
                            // data={this.rolesData}
                            data={this.state.roles}
                            sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</AdminTable>
         {
                  this.state.checkBoxError &&  <div  className="mb-3" style={{color:"red"}}>
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