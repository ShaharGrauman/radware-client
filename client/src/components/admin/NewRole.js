import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// import DropLeftRight from './DropLeftRight';
import Table from './TableRole';

export default class NewRole extends React.Component {

  constructor(props){
    super(props);

    
   this.state = { 
     form:{ rolename: '', description: ''},
     errors:{}
   };   
  }

  roleNameError(input){
    if (input.name === 'rolename') {
        if(input.value.trim()==='') return 'rolename is required';
    }
  
}

descriptionError(input){
  if (input.name === 'description') {
      if(input.value.trim()==='') return 'description is required';
  }

}


validateProperty = (input) =>{
  switch(input.name){
      case 'rolename': return this.roleNameError(input);
      case'description' : return this.descriptionError(input);

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
 if (this.state.form.rolename.trim()==='' )
  errors.rolename='rolename is required ';
  if (this.state.form.description.trim()==='' )
  errors.description='description is required ';
  return Object.keys(errors).length===0 ? null : errors;
 };



 onSubmit = e => {
  e.preventDefault();
 const errors = this.validate();//method return object looks like error 
  console.log(errors);
  this.setState({ errors: errors || {} });//we render the object errors  in the setstate 
 
  if (errors) return;
  
  console.log("submitted");
  console.log(this.state);
};

  render() {
    return (
      <>
        <div className="row">
          <div className="col-10">
            <div className="row ">
              <div className="col-1"></div>
              <h2>New Role</h2>
              
            </div>

            <div className="row">
              <div className="col-1"></div>
              <div className="col-2">
                <div className="form-group">
                  <div className="input-group-prepend">
                    <label>Name:</label>
                  </div>
                </div>
              </div>

              <div className="col-7">
                <div>
                  <div className="form-group">
                    <div className="input-group-prepend">
                      <input
                        value={this.state.form.name}
                        onChange={this.handleChange}
                        id="rolename"
                        name="rolename"
                        type="text"
                        className="form-control"
                        placeholder="Rolename"
                      />
                       
                    </div>
                    { this.state.errors.rolename && <div className="alert alert-danger">{this.state.errors.rolename}</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-1"></div>
              <div className="col-2">
                <div className="form-group">
                  <div className="input-group-prepend">
                    <label> Description: </label>
                  </div>
                </div>
              </div>

              <div className="col-7">
                <div>
                  <div className="form-group">
                    <div className="input-group-prepend">
                    <textarea  className="form-control rounded-0" 
                     id="description"
                     rows="10"
                     onChange={this.handleChange}
                     name="description"
                    // value={this.state.form.description}
                     />
                    

                     
                    </div>
                    { this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}
                  </div>
                </div>
              </div>
            </div>

        {/* <DropLeftRight  data={this.data}/> */}
        <div class="d-flex justify-content-center"> <Table/></div>
             <div className="row">
              <div className="col-2"></div>
              <div className="col-7">
              <div className="form-group">
              <button type="button" className="btn btn-secondary  btn-block">Cancel</button>
              </div>
              </div>
              </div>


              <div className="row">
              <div className="col-2"></div> 
              <div className="col-7">
              <div className="form-group">
              <button  onClick={this.onSubmit}  type="button" className="btn btn-secondary btn-block">Save</button>
               </div>
             </div>
             </div>

            </div>
          </div>
        
      </>
    );
  }
}
