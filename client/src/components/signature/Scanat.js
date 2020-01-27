import React from 'react';

export default class Scanat extends React.Component {
  render() {
    return (
      <>
        <h6>Scan at:</h6>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"></input>
          <label className="form-check-label" for="defaultCheck1">URI</label>
        </div>
        <div className="row container">
          <div className="form-check form-check-inline col">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
            <label className="form-check-label" for="inlineCheckbox1">Headers</label>
          </div>
          <div className="form-check form-check-inline col">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"></input>
            <label className="form-check-label" for="inlineCheckbox2">Body</label>
          </div>
        </div>
        <div className="row container">
          <div className="form-check form-check-inline col">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
            <label className="form-check-label" for="inlineCheckbox1">Parameters</label>
          </div>
          <div className="form-check form-check-inline col">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"></input>
            <label className="form-check-label" for="inlineCheckbox2">FileName</label>
          </div>
        </div>
        <hr />
      </>
    )
  }
}