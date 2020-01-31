import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";

import {constants} from './dataManager'

export default class AttackTypeSelection extends SwitchableComponent {
  constructor(props){
    super(props);
  }

  onChange = e => {
    if(e.target.value>=0){
      this.props.onSelect('attackType', e.target.selectedOptions[0].text)
    }else{
      this.props.onSelect('attackType',"" )
    }
  }

  render() {
    return (
      <>
        <label htmlFor="attack-type">Attack Type:</label>
        <select className="custom-select" id="attack-type" onChange={this.onChange} disabled={this.state.disabled}>
          <option defaultValue >All</option>
          {
            constants.attackType.map((attack,index)=>
              <option value={index}>{attack}</option>
            )
          }
          {/* <option defaultValue>Attack</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> */}
        </select>
      </>
    );
  }
}
