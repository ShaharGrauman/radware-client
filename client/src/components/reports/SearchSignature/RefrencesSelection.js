import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";

import {constants} from './dataManager'


export default class RefrencesSelection extends SwitchableComponent {
  render() {
    return (
      <>
        <label htmlFor="cveid">Reference:</label>
        <span className="row">
          <span className="col-sm-12 col-md-8 col-lg-6">
            <select className="custom-select" id="cveid" disabled={this.state.disabled}>
              <option defaultValue>CveId</option>
              {
               constants.reference.map((reference,index)=>
                 <option value={index}>{reference}</option>
               )
              }
              {/* <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option> */}
            </select>
          </span>
        </span>
        <div className="py-2">
          <input type="text" className="form-control" id="cveid_text" disabled={this.state.disabled}/>
        </div>
      </>
    );
  }
}
