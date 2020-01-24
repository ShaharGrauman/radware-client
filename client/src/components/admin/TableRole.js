import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight,faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class Table extends React.Component{

        state={
            Roles:['New signature','Search signature','Export' , 'Permission 1', 'Permission 2'],
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
        
  <div className="row">
    <div className="col-md-12 col-sm-4 mb-2">
      <div className="form-group">
              <div className="input-group-prepend">
                  <select multiple size="5">
                  <option disabled style={{border:'1px solid black'}}>Avaliable permissions</option>
                 { 
                      this.state.Roles.map(Role=>{
                      return <option onClick={()=>
                            this.setState({
                             Role:Role,
                            },    
                        )}>{Role}  
                </option>})
                 }
                  </select>
                            <div className="mt-4 ml-3">
                            Add <FontAwesomeIcon icon={faArrowRight} onClick={this.addNewRole}></FontAwesomeIcon><div></div>
                            <FontAwesomeIcon icon={faArrowLeft} onClick={this.RemoveRole}></FontAwesomeIcon>Remove
                             </div>
                     
                        <div className="input-group-prepend ml-2">
                            <select multiple size="5">
                            <option disabled style={{border:'1px solid black'}}>Selected permissions</option>
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
             </div>  
        );
    }
    
}
