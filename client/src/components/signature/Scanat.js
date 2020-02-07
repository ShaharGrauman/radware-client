import React from 'react';

export default class Scanat extends React.Component {
  render() {
    return (
      <>
        <h6>Scan at : </h6>
        <div className="row container">
          <div className="form-check form-check-inline col">
            <input name="scan_uri" id="inlineCheckbox1" checked={this.props.signatureData.scan_uri} onChange={this.props.onChangeHandler} className="form-check-input" disabled={this.props.disabled} type="checkbox" />
            <label className="form-check-label" for="inlineCheckbox1">Scan URl</label>
          </div>
          <div className="form-check form-check-inline col">
            <input name="scan_parameters" id="inlineCheckbox2" checked={this.props.signatureData.scan_parameters} onChange={this.props.onChangeHandler} className="form-check-input" disabled={this.props.disabled} type="checkbox" />
            <label className="form-check-label" for="inlineCheckbox2">Scan Parameters</label>
          </div>
        </div>
        <div className="row container">
          <div className="form-check form-check-inline col">
            <input name="scan_body" id="inlineCheckbox3" checked={this.props.signatureData.scan_body} onChange={this.props.onChangeHandler} className="form-check-input" disabled={this.props.disabled} type="checkbox" />
            <label className="form-check-label" for="inlineCheckbox3">Scan Body</label>
          </div>
          <div className="form-check form-check-inline col">
            <input name="scan_file_name" id="inlineCheckbox4" checked={this.props.signatureData.scan_file_name} onChange={this.props.onChangeHandler} className="form-check-input" disabled={this.props.disabled} type="checkbox" />
            <label className="form-check-label" onChange={this.props.onChangeHandler} for="inlineCheckbox4">Scan Filename</label>
          </div>
        </div>
        <div className="row container">
          <div className="form-check form-check-inline">
            <input name="scan_header" id="inlineCheckbox5" checked={this.props.signatureData.scan_header} onChange={this.props.onChangeHandler} className="form-check-input" disabled={this.props.disabled} type="checkbox" />
            <label className="form-check-label" for="inlineCheckbox5">Scan Headers</label>
          </div>
        </div>
      </>
    )
  }
}