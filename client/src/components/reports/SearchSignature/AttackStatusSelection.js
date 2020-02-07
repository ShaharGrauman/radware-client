import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";

import {constants} from './dataManager'

import Select from 'react-select';


export default class AttackStatusSelection extends SwitchableComponent {
  constructor(props){
    super(props);
    this.state={
      selectedOption: null,
    }
  }

  handleChange = selectedOption => {
    let url=[]
    if(selectedOption!=null){
    selectedOption.forEach(attack=>{
      url.push(attack.value)
    })
  }
      this.setState(
        { selectedOption }
      );
    this.props.onSelect('status',url)
  };

  // onChange = e => {
  //   console.log(e.target.value)
  //   if(e.target.value!='All'){
  //     this.props.onSelect('status',e.target.value)
  //   }else{
  //     this.props.onSelect('status',"" )
  //   }
  // }
  render() {  
    const { selectedOption } = this.state;
    return (
      <>
        <label htmlFor="attack-Status">Status:</label>

        <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={constants.status}
        isMulti ={true}
      />
        {/* <select className="custom-select" id="attack-Status" onChange={this.onChange} disabled={this.state.disabled}>
          <option defaultValue >All</option>

          {
            constants.status.map(status=>
              <option value={status.id}>{status.name}</option>
              )
          }

        </select> */}
      </>
    );
  }
}
