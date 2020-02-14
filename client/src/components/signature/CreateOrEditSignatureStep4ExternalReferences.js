import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faTextHeight } from '@fortawesome/free-solid-svg-icons';

import Table from '../shared/Table';
import Actions from '../shared/Actions';

export default class CreateOrEditSignatureStep4ExternalReferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      increment_index: 0
    };
    this.webServerHeader = ['Web Server', 'Actions'];
    this.dataHeader = ['Reference', 'Type', 'Actions'];
  }

  render() {
    return (
      <div className="container-fluid">
        <h5 className="mt-3">External references</h5>
        <div className="row ml-2 input-group">
          <div className="input-group-append col-md-4 mb-2 col-xs-4">
            <FontAwesomeIcon className="mt-2 fa-lg mr-2" icon={faLink}></FontAwesomeIcon>
            <input className="form-control" placeholder="Reference" type="text" id="referenceId" />
          </div>
          <div className="input-group col-md-5">

            <label className="mb-3 mt-1">
              <FontAwesomeIcon className="mt-2 fa-lg mr-2" icon={faTextHeight}></FontAwesomeIcon>
            </label>
            <select id="inputType" className="form-control">
              <option selected>CveId</option>
              <option>bugtraqid</option>
            </select>
            <div className="col-md-5 col-xl-3 col-lg-4">
              <button type="button" className="btn btn-secondary btn-block ml-3 " onClick={() => {
                this.setState({ increment_index: this.state.increment_index + 1 });
                this.props.addToStateArray('external_references', { id: `NEW_${this.state.increment_index}`, reference: document.querySelector('#referenceId').value, type: document.querySelector('#inputType').value })
              }}>Add</button>
            </div>

          </div>
          <div className="col-md-2 col-xs-4 mb-2"></div>
        </div>
        <div className="row mt-3">
          <div className="col-md-5 col-sm-5">
            <Table headers={this.dataHeader} data={this.props.signatureData.external_references.map(er => {
              return ({ reference: er.reference, type: er.type, actions: [<Actions id={er.id} stateName="external_references" excludeFromStateArrayById={this.props.excludeFromStateArrayById} />] });
            })} />
          </div>
        </div>
        <hr />
        <h5 className="row mt-3 ml-1">Web servers</h5>
        <div className="row">
          <div id="btns" className="col md-3">
            <div className="input-group sm-3">
              <input type="text" className="form-control" id="webServerName" placeholder="Web Server"></input>
              <div className="input-group-append">
                <button type="button" className="btn btn-secondary" onClick={() => {
                  this.setState({ increment_index: this.state.increment_index + 1 });
                  this.props.addToStateArray('web_servers', { id: `NEW_${this.state.increment_index}`, web: document.querySelector('#webServerName').value })
                }}>Add</button>
              </div>
            </div>
          </div>
          <div className="col-md-9"></div>
        </div>
        <div className="row mt-3">
          <div className="col-md-5 col-sm-3">
            <Table headers={this.webServerHeader} data={this.props.signatureData.web_servers.map(ws => {
              return ({ webServer: ws.web, actions: [<Actions id={ws.id} stateName="web_servers" excludeFromStateArrayById={this.props.excludeFromStateArrayById} />] });
            })} />
          </div>
        </div>
      </div>
    );
  }
}