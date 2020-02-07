// import React from 'react';
// import Table from './RolesDashboard';
// import RolesTable from './RolesTable';
// import Style from './Style.css';
// import SelectRole from './SelectRole';
// import MyTable from '../shared/MyTable';
// import { Redirect} from 'react-router-dom'
// import axios from 'axios';
// import SelectRole2 from './PermissionsTable';
// export default class NewRole extends React.Component {
//     constructor(props){
//         super(props);
//         this.state={
//             role:{
//                 rolename: null, description:null
//             },
//             cancelClicked: false,
//             form:{ rolename: '', description: ''},
//             errors:{}
//         };
//     }
//     renderRedirect = () => {
//           this.setState({
//             cancelClicked: true
//           });
//     }
        
//     rolesData=[    
//             { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
//             { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
//             { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />}
//         ];
//         tableHeaders = ["Roles", "Select"];

    

//     rolenameError(input){
//         if (input.name === 'rolename') {
//             if(input.value.trim()==='') return 'role name is required';
//         } 
//     }

//     descriptionError(input){
//         if (input.name === 'description') {
//             if(input.value.trim()==='') return 'last name is required';
//         } 
//     }

   
//     validateProperty = (input) =>{
//         switch(input.name){
//             case 'rolename': return this.rolenameError(input);
//             case'description' : return this.descriptionError(input);

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
//            if (this.state.form.rolename.trim()==='' )
//             errors.rolename='first name is required ';
//             if (this.state.form.description.trim()==='' )
//             errors.description='last name is required ';
//             if (this.state.form.phone.trim()==='' )
           
//             return Object.keys(errors).length===0 ? null : errors;
//            };
              

// registerClick = ()=>{
//     const dataUser={
//         role:this.state.role.rolename
//     }
//     alert(dataUser)
// }
//  onSubmit = e => {
//     e.preventDefault();
//    const errors = this.validate();//method return object looks like error 
//     console.log(errors);
//     this.setState({ errors: errors || {} });//we render the object errors  in the setstate 
   
//     if (errors) return;
//     axios.post(`http://localhost:3001/roles`, (req, res) => res.json()
//     ).then(res => {
//       console.log(res);
//       console.log(res.data);
//     })
  
//     console.log("submitted");
//     console.log(this.state);
//   };

  
//     render() {
//         return (
//             <>
//              <div className="container">
//                     <div className="row mt-2">
//                         <div className="col-md-12">
//                             <h1>New Role</h1>
//                         </div>
//                     </div>

//                     <div className="row">
//                         <div className="col-md-12">
//                         {this.state.cancelClicked && <Redirect to='/roleslist' />}
//                 <form className="ml-3" onSubmit={this.onSubmit}>
//                     {/* <h3>Personal info</h3> */}
//                     <fieldset className="scheduler-border">
//                         <legend className="scheduler-border">Role info</legend>

//                         {/* <h3>Personal info</h3> */}

//                         <div className="form-group mt-2 ml-2">
//                             <label htmlFor="rolename">Role Name : </label>
//                             <input className="form-control"  name= "rolename" type="text" id="fName" onChange={this.handleChange} />
//                             <div> { this.state.errors.rolename && <div className="alert alert-danger">{this.state.errors.rolename}</div>}</div>
//                             {/* <div class="valid-feedback">Valid.</div> */}

//                         </div>

//                         <div className="form-group ml-2">
//                             <label htmlFor="lName">Description : </label>
//                             <input className="form-control" name="description" type="text" id="lName" onChange={this.handleChange} />
//                             <div> { this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}</div>

//                         </div>

//                         </fieldset>
//                         <fieldset className="scheduler-border">
//                         <legend className="scheduler-border">table info</legend>
                       
//                         <p className="ml-2">Select role :</p>
//                         {/* <div className="col-4"></div>
//                         <div className= "col-6"> */}
//                             {/* <RolesTable /> */}
//                             {/* <SelectRole/> */}
//                             <SelectRole2/>
//                             {/* <TableTest header={this.tableHeaders} data={this.rolesData}/> */}
//                         {/* </div> */}
//                         </fieldset>

//                         <button type="submit" onClick={this.registerClick} className="btn btn-secondary btn-block" >Save</button>
//                         <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>
                   
//                 </form>                        </div>
//                     </div>
//                 </div>
               
//             </>
//         );
//     }
// }



import React from 'react';
import SelectRole from './SelectRole';
import MyTable from '../shared/MyTable';
import { Redirect} from 'react-router-dom'
import axios from 'axios';
import PermissionsTable from './PermissionsTable';
export default class NewRole extends React.Component {
    constructor(props){
        super(props);
        this.state={
                rolename: null,
                 description:null,
                 ischecked:false
            ,
            cancelClicked: false,
            errors:{}
        };
    }
    renderRedirect = () => {
          this.setState({
            cancelClicked: true
          });
    }
        
    // rolesData=[    
    //         { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
    //         { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />},
    //         { rolename:"Role 1" , selected:<input type="checkbox" name="myTextEditBox" value="checked" />}
    //     ];
    //     tableHeaders = ["Roles", "Select"];

    

   
    

registerClick = ()=>{
    // this.setState({rolename: document.getElementById('rolenam')});
   let dataRole = {
       rolename: this.state.rolename,
       description: this.state.description
   }
   alert(JSON.stringify(dataRole))
}

 
onChangeHandler = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const unsavedData = { ...this.state, [target.name]: value };
    this.setState(unsavedData);
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
                    {/* <h3>Personal info</h3> */}
                    <fieldset className="scheduler-border">
                        <legend className="scheduler-border">Role info</legend>

                        {/* <h3>Personal info</h3> */}

                        <div className="form-group mt-2 ml-2">
                            <label htmlFor="rolename">Role Name : </label>
                            <input className="form-control"  name="rolename" type="text" id="fName" onChange={this.onChangeHandler} />
                            <div> { this.state.errors.rolename && <div className="alert alert-danger">{this.state.errors.rolename}</div>}</div>
                            {/* <div class="valid-feedback">Valid.</div> */}

                        </div>

                        <div className="form-group ml-2">
                            <label htmlFor="lName">Description : </label>
                            <input className="form-control" name="description" type="text" id="lName" onChange={this.onChangeHandler} />
                            <div> { this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}</div>

                        </div>

                       
                       
                        <p className="ml-2">Select Permission :</p>
                        {/* <div className="col-4"></div>
                        <div className= "col-6"> */}
                            {/* <RolesTable /> */}
                            {/* <SelectRole/> */}
                            <PermissionsTable/>
                            {/* <TableTest header={this.tableHeaders} data={this.rolesData}/> */}
                        {/* </div> */}
                        </fieldset>
                        <button type="button" onClick={this.registerClick} className="btn btn-secondary btn-block" >Save</button>
                        <button type="button" onClick={() => this.renderRedirect("users")} className="btn btn-secondary  btn-block">Cancel</button>
                        
                </form>                        </div>
                
                    </div>
                    
                </div>
                


               
            </>
        );
    }
}

