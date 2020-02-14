import React from 'react';

import Status from './Status';
import Severity from './Severity';
import Description from './Description';

export default class CreateOrEditSignatureStep1Details extends React.Component {
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
      'Israeli ID Leakage']
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

                  <select className="form-control" value={this.props.signatureStatus} onChange={this.props.onChangeHandler}>
                    <option selected>Attack...</option>
                    {
                      attacks.map((s, index) => <option key={index}>{s}</option>)
                    }
                  </select>

                </div>
            
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