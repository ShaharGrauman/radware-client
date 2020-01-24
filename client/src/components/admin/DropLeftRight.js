import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default class DropLeftRight extends React.Component {
  state={
    Roles:['Role1','Role2','Role3','Role4','Role5'],
    Role:'',
    selectedroles:[]
};



addNewRole = ()=>{

const newSelectedRoles = this.state.selectedroles.concat(this.state.Role).filter(role => role != '');
this.setState({
  selectedroles: newSelectedRoles,
  Role:''
})                                           

const filteredRoles=this.state.Roles.filter(role => role != this.state.Role)
  this.setState({Roles:filteredRoles})
}

RemoveRole = () =>{
if(this.state.Role != ''){
this.setState({
    Roles: this.state.Roles.concat(this.state.Role),
    Role:''
})}

const newSelectedRoles =this.state.selectedroles.filter(role => role != this.state.Role)
this.setState({
    selectedroles:newSelectedRoles
})
}



  render() {
    return (
      <>

<div className="row">
              <div className="col-4"></div>
              <div className="col-1">
                <div className="form-group">
                  <div className="input-group-prepend">
                    <select multiple size="5">
                     {
                     this.state.Roles.map(Role =>{
                     return  <option onClick={()=>
                      this.setState({
                        Role:Role,
                      },    
                  )}>{Role}  
          </option>})
           }
                      
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-1 mt-4">
                <div>
                  Add <FontAwesomeIcon icon={faArrowRight} onClick={this.addNewRole}></FontAwesomeIcon>
                </div>
                <div>
                <FontAwesomeIcon icon={faArrowLeft}  onClick={this.RemoveRole}></FontAwesomeIcon> Remove
                </div>
              </div>

              <div className="col-2">
                <div>
                  <div className="form-group">
                    <div className="input-group-prepend">
                      <select multiple size="5">
                   
                      {
                     this.state.selectedroles.map(op => {
                      return <option onClick={() => {
                          this.setState({Role:op}
                      )}
                      }>{op}</option>
                     })
                   }
                  </select>       
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6"></div>
            </div>
      



         
      




</>
    );
  }
}