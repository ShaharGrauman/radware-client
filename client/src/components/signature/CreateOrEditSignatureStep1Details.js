import React from 'react';

import Status from './Status';
import Severity from './Severity';
import Description from './Description';

export default class CreateOrEditSignatureStep1Details extends React.Component {
  render() {
    return (
      <div>
        <div id="container-fluid row">
          <div className="row">
            <div className="col-lg-5 ml-4 col-md-5 col-sm-10 col-xs-1 attackname">
            </div>
            <div className="col-lg-5 col-md-5 col-sm-10 col-xs-1"></div>
          </div>
          <div className="row ml-2 justify-content-around">
            <div className="col-lg-5 col-md-5 mb-2 col-sm-10 col-xs-8">
            <h5 className="display-5">Attack name:</h5>
              <small>The customer will identity the attack by this name</small>
              <div id="btns">
                <div className="input-group sm-3">
                  <input type="text" className="form-control" name="attackName" placeholder="Attack name" value={this.props.signatureData.attackName} onChange={this.props.onChangeHandler} onBlur={this.props.onBlur}></input>
                  <div className="input-group-append">
                    <button type="button" className="btn btn-secondary">Search</button>
                  </div>
                </div>
                    {
                      this.props.signatureErrors.attackName.map(error => <small className="text-danger">{error}</small>)
                    }
              </div>
            </div>
            <Status status={this.props.signatureData.status} onChangeHandler={this.props.onChangeHandler} />
          </div>
          <div className="row ml-2 justify-content-around">
            <Severity severity={this.props.signatureData.severity} onChangeHandler={this.props.onChangeHandler} />
            <div className="col-lg-5 col-md-5 col-sm-10 col-xs-8"></div>
          </div>
          <div className="row justify-content-around">
            <Description description={this.props.signatureData.description} onChangeHandler={this.props.onChangeHandler} />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6"></div>
          <div class="col-md-4 text-right"></div>
        </div>
      </div>
    );
  }
}