import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";
import { constants } from './dataManager'

export default class RefrencesSelection extends SwitchableComponent {
  onChange = e => {
    if (e.target.id == "cveid") {
      if (e.target.value >= 0) {
        this.props.onSelect('refrencesSelection', e.target.value)
      } else {
        this.props.onSelect('refrencesSelection', "")
      }
    } else {
      this.props.onSelect('refrencesInput', e.target.value)
    }
  }

  render() {
    return (
      <>
        <label htmlFor="cveid">Reference:</label>
        <span className="row">
          <span className="col-sm-12 col-md-8 col-lg-6">
            <select className="custom-select" id="cveid" onChange={this.onChange} disabled={this.state.disabled}>
              <option defaultValue>Select</option>
              {
                constants.reference.map(reference =>
                  <option value={reference.id}>{reference.name}</option>
                )
              }
            </select>
          </span>
        </span>
        <div className="py-2">
          <input type="text" className="form-control" id="cveid_text" onBlur={this.onChange} disabled={this.state.disabled} />
        </div>
      </>
    );
  }
}
