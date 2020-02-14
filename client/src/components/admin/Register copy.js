import React from 'react';
import Table from './RolesDashboard';
import Style from './Style.css';
import MyTable from '../shared/MyTable';
import { Redirect} from 'react-router-dom'
import axios from 'axios';
export default class Register1 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            cancelClicked: false,
            form:{ firstname: '', lastname: '', phone:'', email:'', password:'', passwordconfirm:''},
            errors:{}
        };
    }
    renderRedirect = () => {
          this.setState({
            cancelClicked: true
          });
    }
        
    rolesData=[    
            { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
            { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
            { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />}
        ];
        tableHeaders = ["Roles", "Select"];

    

    firstNameError(input){
        if (input.name === 'firstname') {
            if(input.value.trim()==='') return 'first name is required';
        } 
    }

    lastNameError(input){
        if (input.name === 'lastname') {
            if(input.value.trim()==='') return 'last name is required';
        } 
    }

    phoneError(input){
        if (input.name === 'phone') {
            if(input.value.trim()==='') return 'phone is required';
        } 
    }
    emailError(input) {
        if (input.name === 'email') {
          if (input.value.trim() === '') return 'email is required';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          return "Email should be a valid email";
        }
      }
    passwordError(input){
        if (input.name === 'password') {
            if(input.value.trim()==='') return 'password is required';
        } 
    }
    confirmPasswordError(input){
        if (input.name === 'confirmpassword') {
            if(input.value.trim()==='') return 'password is required';
        } 
    }


    validateProperty = (input) =>{
        switch(input.name){
            case 'firstname': return this.firstNameError(input);
            case'lastname' : return this.lastNameError(input);
            case 'phone': return this.phoneError(input);
            case'email' : return this.emailError(input);
            case 'password': return this.passwordError(input);
            case'confirmpassword' : return this.confirmPasswordError(input);
      
        }
        }
          handleChange = ({currentTarget : input }) => {
            const errors={...this.state.errors};
            const errorMessage = this.validateProperty(input);
             if (errorMessage)  errors[input.name]=errorMessage;
             else delete errors[input.name];
          
            const form = { ...this.state.form };
            form[input.name] = input.value;
            this.setState({ form,errors });
          
          };
          
           validate = () =>{// validate form only 
          
            const errors={};
           if (this.state.form.firstname.trim()==='' )
            errors.firstname='first name is required ';
            if (this.state.form.lastname.trim()==='' )
            errors.lastname='last name is required ';
            if (this.state.form.phone.trim()==='' )
            errors.phone='phone is required ';
            if (this.state.form.email.trim()==='' )
            errors.email='email is required ';
            if (this.state.form.password.trim()==='' )
            errors.password='password is required ';
            if (this.state.form.passwordconfirm.trim()==='' )
            errors.passwordconfirm='confirm password is required ';
            return Object.keys(errors).length===0 ? null : errors;
           };
              

           
 onSubmit = e => {
    e.preventDefault();
   const errors = this.validate();//method return object looks like error 
    console.log(errors);
    this.setState({ errors: errors || {} });//we render the object errors  in the setstate 
   
    if (errors) return;
    axios.post(`http://localhost:3001/users`, (req, res) => res.json()
    ).then(res => {
      console.log(res);
      console.log(res.data);
    })
  
    console.log("submitted");
    console.log(this.state);
  };

  
    render() {
        return (
            <>
                {this.state.cancelClicked && <Redirect to='/users' />}
                <form className="ml-3" onSubmit={this.onSubmit}>
                    {/* <h3>Personal info</h3> */}
                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">Personal info</legend>

                        {/* <h3>Personal info</h3> */}

                        <div className="form-group mt-2 ml-2">
                            <label htmlFor="firstname">First name : </label>
                            <input className="form-control"  name= "firstname" type="text" id="fName" onChange={this.handleChange} />
                            <div> { this.state.errors.firstname && <div className="alert alert-danger">{this.state.errors.firstname}</div>}</div>
                            {/* <div class="valid-feedback">Valid.</div> */}

                        </div>

                        <div className="form-group ml-2">
                            <label htmlFor="lName">Last name : </label>
                            <input className="form-control" name="lastname" type="text" id="lName" onChange={this.handleChange} />
                            <div> { this.state.errors.lastname && <div className="alert alert-danger">{this.state.errors.lastname}</div>}</div>

                        </div>

                        <div className="form-group ml-2">
                            <label htmlFor="Rphone">Phone :</label>
                            <input className="form-control" type="text" name= "phone" id="Rphone" onChange={this.handleChange} />
                            <div> { this.state.errors.phone && <div className="alert alert-danger">{this.state.errors.phone}</div>}</div>

                        </div>
                        </fieldset>
                        <fieldset className="scheduler-border">
                        <legend className="scheduler-border">User info</legend>
                        <div className="form-group ml-2">
                            <label htmlFor="Remail">Email address :</label>
                            <input type="email" className="form-control" name="email" id="Remail" aria-describedby="emailHelp" placeholder="name@example.com" onChange={this.handleChange} />
                            <div> { this.state.errors.email && <div className="alert alert-danger">{this.state.errors.email}</div>}</div>
                            <small className="form-text text-muted">This will be used as username.</small>
                        </div>

                        <div className="form-group ml-2">
                            <label htmlFor="PassReg">Password :</label>
                            <input type="password" className="form-control" name="password" id="PassReg" onChange={this.handleChange} />
                            <div> { this.state.errors.password && <div className="alert alert-danger">{this.state.errors.password}</div>}</div>
                            <small id="passwordHelp" className="form-text text-muted">Must be at least 6 letters.</small>
                        </div>
                         <div className="form-group ml-2">
                            <label htmlFor="password"> Password Confirm : </label>
                            <input type="password" name="confirmpassword" className="form-control inputpass" minLength="6" maxLength="16" placeholder="Enter again to validate" id="password"/> 
                            <div> { this.state.errors.passwordconfirm && <div className="alert alert-danger">{this.state.errors.passwordconfirm}</div>}</div>

                         </div> 
                        <p className="ml-2">Select role :</p>
                        {/* <div className="col-4"></div>
                        <div className= "col-6"> */}
                            {/* <RolesTable /> */}
                            {/* <SelectRole/> */}
                            {/* <SelectRole/> */}
                            {/* <TableTest header={this.tableHeaders} data={this.rolesData}/> */}
                        {/* </div> */}
                        <MyTable
                                header={this.tableHeaders}
                                data={this.rolesData}
                                sortDataByKey={(sortKey) => this.SortByKey(sortKey)}
                                className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >key={this.state.roles.ID}</MyTable>
                      
                        </fieldset>

                        <button type="submit" className="btn btn-secondary btn-block" >Save</button>
                        <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>
                   
                </form>
            </>
        );
    }
}
import React from 'react';
