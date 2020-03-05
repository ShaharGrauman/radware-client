import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";
import Select from 'react-select';
import { constants } from './dataManager'

export default class AttackTypeSelection extends SwitchableComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    }
  }

  handleChange = selectedOption => {
    let url = []
    if (selectedOption != null) {
      selectedOption.forEach(attack => {
        url.push(attack.value)
      })
    }
    this.setState(
      { selectedOption }
    );
    this.props.onSelect('[attackId]', url)
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <>
        <label htmlFor="attack-type">Attack Type:</label>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={constants.attackType}
          isMulti={true}
        />
      </>
    )
  }
}
