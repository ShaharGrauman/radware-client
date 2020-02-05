import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";

import Select from 'react-select';


import {constants} from './dataManager'

export default class AttackTypeSelection extends SwitchableComponent {
  constructor(props){
    super(props);
    this.state={
      selectedOption: null,
    }
  }

  handleChange = selectedOption => {
    let url=''
    if(selectedOption!=null){
    selectedOption.forEach(attack=>{
      url=url.concat(`+${attack.value}`)
    })
  }
      this.setState(
        { selectedOption }
      );
    this.props.onSelect('attackType',url.slice(1))
  };

  // onChange = e => {
  //   console.log(e.target)
  //   if(e.target.value>=0){
  //     // this.props.onSelect('attackType', e.target.selectedOptions[0].text)
  //     this.props.onSelect('attackType', e.target.value)
  //   }else{
  //     this.props.onSelect('attackType',"" )
  //   }
  // }

  render() {
    const { selectedOption } = this.state;

    return (
      <>
        <label htmlFor="attack-type">Attack Type:</label>


        <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={constants.attackType}
        isMulti ={true}
      />
      
        {/* <select className="custom-select" id="attack-type" onChange={this.onChange} disabled={this.state.disabled}>
          <option defaultValue >All</option>
          {
            constants.attackType.map(attack=>
              <option value={attack.id}>{attack.name}</option>
            )
          }

        </select> */}
      </>
    );
  }
}
