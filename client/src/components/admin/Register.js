
// import React from 'react';
// import Table from './RolesDashboard';
// import MyTable from '../shared/MyTable';
// import { Redirect} from 'react-router-dom'
// import axios from 'axios';

// export default class Register extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={
//             cancelClicked: false,
//             form:{ firstname: '', lastname: '', phone:'', email:'', password:'', passwordconfirm:''},
//             errors:{},
//             orgRoles: [],
//             roles: [],
//         };
//     }
//     tableHeaders = ["Select Roles", "Selected Roles"];

//     renderRedirect = () => {
//           this.setState({
//             cancelClicked: true
//           });
//     }

//     componentDidMount() {
//         axios.get(`http://localhost:3000/users/roles`, (req, res) => res.json()
//         ).then(res => {
//             const roles = res.data.map(role => ({
//               role: role.name,
//               selected:<input type="checkbox" name="myTextEditBox" value="checked"></input>
//             }));
    
//             this.setState({ roles: roles });
//           });
//       }
//     rolesData=[    
//             { rolename:"Researcher" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
//             { rolename:"Support" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
//             { rolename:"Manual QA" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
//             { rolename:"Performance QA" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
//             { rolename:"Automation QA" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />}

//         ];
//         tableHeaders = ["Roles", "Select"];

    

//     firstNameError(input){
//         if (input.name === 'firstname') {
//             if(input.value.trim()==='') return 'first name is required';
//         } 
//     }

//     lastNameError(input){
//         if (input.name === 'lastname') {
//             if(input.value.trim()==='') return 'last name is required';
//         } 
//     }

//     phoneError(input){
//         if (input.name === 'phone') {
//             if(input.value.trim()==='') return 'phone is required';
//         } 
//     }
//     emailError(input) {
//         if (input.name === 'email') {
//           if (input.value.trim() === '') return 'email is required';
//         }
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
//           return "Email should be a valid email";
//         }
//       }
//     passwordError(input){
//         if (input.name === 'password') {
//             if(input.value.trim()==='') return 'password is required';
//         } 
//     }
//     confirmPasswordError(input){
//         if (input.name === 'confirmpassword') {
//             if(input.value.trim()==='') return 'password is required';
//         } 
//     }


//     validateProperty = (input) =>{
//         switch(input.name){
//             case 'firstname': return this.firstNameError(input);
//             case'lastname' : return this.lastNameError(input);
//             case 'phone': return this.phoneError(input);
//             case'email' : return this.emailError(input);
//             case 'password': return this.passwordError(input);
//             case'confirmpassword' : return this.confirmPasswordError(input);
      
//         }
//         }
//           handleChange = ({currentTarget : input }) => {
//             const errors={...this.state.errors};
//             const errorMessage = this.validateProperty(input);
//              if (errorMessage)  errors[input.name]=errorMessage;
//              else delete errors[input.name];
          
//             const form = { ...this.state.form };
//             form[input.name] = input.value;
//             this.setState({ form,errors });
          
//           };
          
//            validate = () =>{// validate form only 
          
//             const errors={};
//            if (this.state.form.firstname.trim()==='' )
//             errors.firstname='first name is required ';
//             if (this.state.form.lastname.trim()==='' )
//             errors.lastname='last name is required ';
//             if (this.state.form.phone.trim()==='' )
//             errors.phone='phone is required ';
//             if (this.state.form.email.trim()==='' )
//             errors.email='email is required ';
//             if (this.state.form.password.trim()==='' )
//             errors.password='password is required ';
//             if (this.state.form.passwordconfirm.trim()==='' )
//             errors.passwordconfirm='confirm password is required ';
//             return Object.keys(errors).length===0 ? null : errors;
//            };
              

//            onSubmit = () => {
//             const createNewUser = {
//                 name: this.state.form.firstname,
//                 phone: this.state.form.phone,
//                 username: this.state.form.email,
//                 status: "active",
//                 password: this.state.form.password
//             };
//             axios.post('http://localhost:3000/users/new_user', createNewUser);
//         }
              
//  onSubmit = async e => {
//     e.preventDefault();
//    const errors = this.validate();//method return object looks like error 
//     console.log(errors);
//     this.setState({ errors: errors || {} });//we render the object errors  in the setstate 

//     if (errors) return;

//     try {
//         const { data } = await axios.post('http://localhost:3000/users/new_user',  
//         this.state.form
//           // ,
//           // { withCredentials: true }
//           );
//         console.log(data);
//         // this.setState({ role: data.roles[0].name });
//         this.setState({ errorMsg: '' });
  
//       } catch (error) {
//         this.setState({
//           errorMsg: 'Invalid email or password'
//         });
//       }
//     axios.post(`http://localhost:3000/users/new_user`, this.state.form
//     ).
//     then(res => {
//       console.log(res);
//       console.log(res.data);
//     })
  
//     console.log("submitted");
//     console.log(this.state);
//   };

  
//     render() {
//         return (
//             <>
//                 {this.state.cancelClicked && <Redirect to='/users' />}
//                 <form className="ml-3" onSubmit={this.onSubmit}>
//                     <fieldset className="scheduler-border">
//                         <legend className="scheduler-border">Personal info</legend>
//                         <div className="form-group mt-2 ml-2">
//                             <label htmlFor="firstname">First name : </label>
//                             <input className="form-control"  name= "firstname" type="text" id="fName" onChange={this.handleChange} />
//                             <div> { this.state.errors.firstname && <div className="alert alert-danger">{this.state.errors.firstname}</div>}</div>

//                         </div>

//                         <div className="form-group ml-2">
//                             <label htmlFor="lName">Last name : </label>
//                             <input className="form-control" name="lastname" type="text" id="lName" onChange={this.handleChange} />
//                             <div> { this.state.errors.lastname && <div className="alert alert-danger">{this.state.errors.lastname}</div>}</div>

//                         </div>

//                         <div className="form-group ml-2">
//                             <label htmlFor="Rphone">Phone :</label>
//                             <input className="form-control" type="text" name= "phone" id="Rphone" onChange={this.handleChange} />
//                             <div> { this.state.errors.phone && <div className="alert alert-danger">{this.state.errors.phone}</div>}</div>

//                         </div>
//                         </fieldset>
//                         <fieldset className="scheduler-border">
//                         <legend className="scheduler-border">User info</legend>
//                         <div className="form-group ml-2">
//                             <label htmlFor="Remail">Email address :</label>
//                             <input type="email" className="form-control" name="email" id="Remail" aria-describedby="emailHelp" placeholder="name@example.com" onChange={this.handleChange} />
//                             <div> { this.state.errors.email && <div className="alert alert-danger">{this.state.errors.email}</div>}</div>
//                             <small className="form-text text-muted">This will be used as username.</small>
//                         </div>

//                         <div className="form-group ml-2">
//                             <label htmlFor="PassReg">Password :</label>
//                             <input type="password" className="form-control" name="password" id="PassReg" onChange={this.handleChange} />
//                             <div> { this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}</div>
//                             <small id="passwordHelp" className="form-text text-muted">Must be at least 6 letters.</small>
//                         </div>
//                          <div className="form-group ml-2">
//                             <label htmlFor="password"> Password Confirm : </label>
//                             <input type="password" name="confirmpassword" className="form-control inputpass" minLength="6" maxLength="16" placeholder="Enter again to validate" id="password"/> 
//                             <div> { this.state.errors.passwordconfirm && <div className="alert alert-danger">{this.state.errors.passwordconfirm}</div>}</div>

//                          </div> 
//                         <p className="ml-2">Select role :</p>

//                             <MyTable
//                                 header={this.tableHeaders}
//                                 // data={this.rolesData}
//                                 data={this.state.roles}
//                                 sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
//                                 className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</MyTable>
                        
//                         </fieldset>

//                         <button type="button" className="btn btn-secondary btn-block" >Save</button>
//                         <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>
                   
//                 </form>
//             </>
//         );
//     }
// }


import React from 'react';
import Table from './RolesDashboard';
import MyTable from '../shared/MyTable';
import Style from './Style.css';
import Joi from 'joi-browser'
import Input from './input';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: { first_name:"", last_name: "", username: "", phone: "", status: "active", password: "" },
            errors: {},
            orgRoles: [],
            roles: []
        };

    }

    tableHeaders = ["Select Roles", "Selected Roles"];

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

    componentDidMount() {
        axios.get(`http://localhost:3000/users/roles`, (req, res) => res.json()
        ).then(res => {
            const roles = res.data.map(role => ({
                role: role.name,
                selected: <input type="checkbox" name="myTextEditBox" value="checked"></input>
            }));

            this.setState({ roles: roles });
        });
    }

    rolesData = [
        { rolename: "Researcher", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Support", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Manual QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Performance QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> },
        { rolename: "Automation QA", selected: <input type="checkbox" name="myTextEditBox" value="checked" /> }

    ];
    tableHeaders = ["Roles", "Select"];

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
        const errors = this.validate();//method return object looks like error 
        this.setState({ errors: errors || {} });//we render the object errors  in the setstate 
        if (errors) return;

        const user = {
            // name: this.state.name,
            //lastName: this.state.lastName,
            username: this.state.account.username,
            phone: this.state.account.phone,
            password: this.state.account.password
        };

/*
        let formBody = [];
        for (let property in user) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(user[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log(formBody);
        

        axios.post(`http://localhost:3000/users/new_user`, { formBody }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
          .then(res => {
            console.log(res);
            console.log(res.data);
        })
        */
    
 
      axios.post('http://localhost:3000/users/new_user', user)
            .then(response => {
                
                console.log(response)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            })
           
        
    };

    handleChange = ({ currentTarget: input }) => {
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
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
                                onChange={this.handleChange}
                                error={errors.password}
                                ref="password"
                            />
                            <small id="passwordHelp" className="form-text text-muted">Must be 6 at least 6 letters.</small>
                        </div>





                        <p className="ml-2">Select role :</p>


                        <MyTable
                            header={this.tableHeaders}
                            data={this.rolesData}
                            // data={this.state.roles}
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