import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";

export default class ScanAtCheckBoxes extends SwitchableComponent {
  onChange = e => {
    // console.log(e.target.value,e.target.checked)
    if(e.target.checked){
      this.props.onSelect(e.target.value, 1)
    }else{
      this.props.onSelect(e.target.value, "")
    }

  }
  render() {
    return (
      <>
        <label htmlFor="scanner">Scan at:</label>

        <span className="row">
          <span className="col">
            <div>
              <input
                type="checkbox"
                id="scan-uri"
                name="scanner"
                value="scanUri"
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
              <label htmlFor="scan-uri"> Uri</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="scan-body"
                name="scanner"
                value="scanBody"
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
              <label htmlFor="scan-body"> Body</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="scan-header"
                name="scanner"
                value="scanHeader"
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
              <label htmlFor="scan-header"> Header</label>
            </div>
          </span>

          <span className="col">
            <div>
              <input
                type="checkbox"
                id="scan-parameters"
                name="scanner"
                value="scanParamters"
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
              <label htmlFor="scan-parameters"> Parameters</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="scan-filename"
                name="scanner"
                value="scanFilename"
                onChange={this.onChange}
                disabled={this.state.disabled}
              />
              <label htmlFor="scan-filename"> Filename</label>
            </div>
          </span>
        </span>
      </>
    );
  }
}
