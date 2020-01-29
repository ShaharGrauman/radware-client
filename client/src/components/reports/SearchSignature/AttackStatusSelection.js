import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";

import {constants} from './dataManager'


export default class AttackStatusSelection extends SwitchableComponent {
  onChange = e => {
    if(e.target.value>=0){
      this.props.onSelect('status', e.target.selectedOptions[0].text)
    }else{
      this.props.onSelect('status',"" )
    }
  }
  render() {  
    return (
      <>
        <label htmlFor="attack-Status">Status:</label>
        <select className="custom-select" id="attack-Status" onChange={this.onChange} disabled={this.state.disabled}>
          <option defaultValue >All</option>

          {
            constants.status.map((status,index)=>
              <option value={index}>{status}</option>
              )
          }
          {/* <option value="1" defaultValue>In progress</option>
          <option value="2">In test</option>
          <option value="3">In QA</option>
          <option value="4">Published</option>
          <option value="5">Suspended</option> */}
        </select>
      </>
    );
  }
}
