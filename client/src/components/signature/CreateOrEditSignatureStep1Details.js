import React from 'react';

import Status from './Status';
import Severity from './Severity';
import validator, { field } from '../shared/validations/validator';

export default class CreateOrEditSignatureStep1Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: field({ name: 'description', value: '', isRequired: true, minLength: 3 }),
      attack: field({ name: 'attack', value: '', isRequired: true }),
    };
  }

  onChange = ({ target: { name, value } }) => this.validate(name, value);

  validate = (fieldName, value) => {
    const errors = validator(fieldName, value, this.state[fieldName].validations);

    this.setState({
      [fieldName]: {
        ...this.state[fieldName],
        isPristine: false,
        errors
      }
    });
  }

  isAllValid = () => {

    Object.keys(this.state).forEach(field => this.validate(field, this.state[field].value));
    return Object.keys(this.state).every(field => !this.state[field].isPristine && this.state[field].errors.length == 0);
  }

  render() {
    const attacks = ['URL Access Violation',
      'Brute Force',
      'LDAP Injection',
      'Cross Site Scripting',
      'SSI Injection',
      'Path Traversal',
      'Hot Link',
      'Folder Access Violation',
      'Security Misconfiguration',
      'Invalid Client Certificate Attributes',
      'Server Information Leakage',
      'HTTP Request Header Size Violation',
      'Revoked Client Certificate Request',
      'Access from Unauthorized source IP',
      'HTTP Method Violation',
      'Credit Card Number Leakage',
      'Social Security Number Leakage',
      'Other Pattern Leakage',
      'Cookie Poisoning',
      'Session Fixation',
      'Server Misconfiguration',
      'File Upload Violation',
      'Evasion',
      'Web Services Abuse',
      'Non-Valid XML Structure',
      'Null Byte Injection',
      'Remote File Inclusion',
      'XPath Injection',
      'High Resource Utilization',
      'Buffer Overflow',
      'Abuse of Functionality',
      'Application Misconfiguration',
      'Mail Command Injection',
      'Fingerprinting',
      'Input Validation Violation',
      'Application Information Leakage',
      'Web Worms',
      'Directory Indexing',
      'Predictable Resource Location',
      'Unauthorized Access Attempt',
      'Session Flow Violation',
      'Cross Site Request Forgery',
      'Unauthorized access attempt',
      'Wrong Username Password Authentication',
      'Authentication Event',
      'Israeli ID Leakage'];

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
                <div className="input-group-append">
                  <select className="form-control" name="attack" value={this.props.signatureStatus} onChange={this.props.onChangeHandler} onBlur={this.onChange}>
                    <option selected disabled>Attack...</option>
                    {attacks.map((s, index) => <option key={index}>{s}</option>)}
                  </select>
                </div>
                {
                  this.state.attack.errors.map((error, index) => (
                    <small className="form-text text-danger" key={index}>{error}</small>
                  ))
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
            <div className="col-lg-11 ml-4 col-md-11 col-sm-10 col-xs-8" style={{ marginTop: 40 }}>
              <h5>Description:</h5>
              <div className="form-group shadow-textarea">
                <textarea rows="20"
                  name="description"
                  defaultValue={this.props.signatureData.description}
                  onChange={this.props.onChangeHandler}
                  onBlur={this.onChange}
                  className="form-control z-depth-1"
                  rows="5"
                  style={{ resize: "none" }}
                  placeholder="Write something here...">
                </textarea>
              </div>
              <div class="mb-3">
              </div>
              {this.state.description.errors.map((error, index) => (
                <small className="form-text text-danger" key={index}>{error}</small>
              ))}
            </div>
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