import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import Table from '../shared/Table';
import Actions from '../shared/Actions';

export default class CreateOrEditSignatureStep4ExternalReferences extends React.Component {
  constructor(props) {
    super(props);
    this.dataHeader = ['Reference', 'Type', 'Actions'];
    this.webServerHeader = ['Web Server', 'Actions'];
    this.data = [
      {
        reference: 'http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=2000-0001',
        type: 'CveId',
        actions: [<Actions />]
      },
      {
        reference: 'http://www.securityfocus.com/bid/21443',
        type: 'BugTraqId',
        actions: [<Actions />]
      },
      {
        reference: 'http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=2000-0001',
        type: '',
        actions: [<Actions />]
      },
      {
        reference: 'http://www.securityfocus.com/bid/21443',
        type: '',
        actions: [<Actions />]
      }
    ];
    this.webServer = [
      {
        webServer: 'GiacomoGuilizzoni',
        actions: [<Actions />]
      },
      {
        webServer: 'MarcoBotton',
        actions: [<Actions />]
      },
      {
        webServer: 'GiacomoGuilizzoni',
        actions: [<Actions />]
      },
      {
        webServer: '',
        actions: [<Actions />]
      }
    ];
  }

  render() {
    return (
      <>
        <h5 className=" mt-3 ml-3">External References</h5>
        <div className="row ml-2 input-group">
          <div className="input-group-append col-md-1 mb-2 col-xs-4"></div>
          <div className="input-group-append col-md-4 mb-2 col-xs-4">
            <FontAwesomeIcon className="mt-2 fa-lg mr-2" icon={faLink}></FontAwesomeIcon>
            <input className="form-control rounded-pill" placeholder="References" type="text" id="referenceId" />
          </div>
          <div className="input-group col-md-5">
            <div className="input-group mb-3">
              <label className="ml-5 mb-3 mt-1"><strong> Type </strong></label>
              <select id="inputType" className="form-control ml-3">
                <option selected>CveId</option>
                <option>...</option>
              </select>
              <div>
                <button className="btn btn-secondary ml-3">ADD</button>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-xs-4 mb-2"></div>
        </div>
        <div className="row mt-3">
          <div className="col-1"></div>
          <div className="col-8 col-md-8 col-sm-10">
            <Table headers={this.dataHeader} data={this.data} />
          </div>
        </div>
        <hr />
        <h5 className="row ml-3 mt-3">Web Servers</h5>
        <div className="row mr-3 input-group">
          <div className="input-group-append col-md-1 ml-2 mb-2 col-xs-4"></div>
          <div className="input-group-append col-md-4 mb-2 col-xs-4">
            <input className="form-control rounded-pill" placeholder="Web Server" type="text" id="webServerId" />
          </div>
          <div className="col-md-3 mb-2 col-xs-4">
            <button className="btn btn-secondary ml-3 ">ADD</button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-1"></div>
          <div className="col-4 col-md-4 col-sm-6">
            <Table headers={this.webServerHeader} data={this.webServer} />
          </div>
        </div>
      </>
    );
  }
}