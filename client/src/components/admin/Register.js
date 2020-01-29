import React  from 'react';
import Table from './RoleList';

export default class Register extends React.Component {
    
    render() {
        return (
            <>
        <form className="ml-3"> 
            <h3>Personal info</h3>

        <div className="form-group "> 	 
                <label htmlFor="firstname">First name : </label>
                <input className="form-control" type="text"  id = "fName" required /> 
        </div>

        <div className="form-group"> 	 
                <label htmlFor="lName">Last name : </label>
                <input className="form-control" type="text" id = "lName" required /> 
        </div>

        <div className="form-group"> 	 
                <label htmlFor="Rphone">Phone :</label>
                <input className="form-control" type="text" id = "Rphone" required /> 
        </div>

        <div className="form-group">
                <label htmlFor="Remail">Email address :</label>
                <input type="email" className="form-control" id="Remail" aria-describedby="emailHelp" placeholder="name@example.com"/>
                <small className="form-text text-muted">This will be used as username.</small>
        </div>
        
        <div className="form-group">
                <label htmlFor="PassReg">Password :</label>
                <input type="password" className="form-control" id="PassReg"/>
                <small id="passwordHelp" className="form-text text-muted">Must be 6 at least 6 letters.</small>
        </div>
        
        <div className="form-group">
                <label htmlFor="password"> Password Confirm : </label>
                <input required  type="password" className="form-control inputpass" minLength="4" maxLength="16" placeholder="Enter again to validate"  id="password" />
                
        </div>
        <p>Select role :</p>
       <div>
           <Table/>
       </div>
        <button type="submit" className="btn btn-secondary btn-block" >Save</button>
        <button type="button" className="btn btn-secondary  btn-block">Cancel</button>
    </form>   
    </>     
        );
    }
}

