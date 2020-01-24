import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";

import {constants} from './dataManager'


export default class AttackStatusSelection extends SwitchableComponent {
  render() {
    return (
      <>
        <label htmlFor="attack-Status">Status:</label>
        <select className="custom-select" id="attack-Status" disabled={this.state.disabled}>
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
