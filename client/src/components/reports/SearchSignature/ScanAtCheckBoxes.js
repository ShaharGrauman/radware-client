import React, { Component } from "react";
import SwitchableComponent from "./SwitchableComponent";

export default class ScanAtCheckBoxes extends SwitchableComponent {
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
                value="scan uri"
                disabled={this.state.disabled}
              />
              <label htmlFor="scan-uri"> Uri</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="scan-body"
                name="scanner"
                value="scan body"
                disabled={this.state.disabled}
              />
              <label htmlFor="scan-body"> Body</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="scan-header"
                name="scanner"
                value="scan header"
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
                value="scan paramters"
                disabled={this.state.disabled}
              />
              <label htmlFor="scan-parameters"> Parameters</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="scan-filename"
                name="scanner"
                value="scan filename"
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
