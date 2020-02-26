import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faTextHeight } from '@fortawesome/free-solid-svg-icons';

import Table from '../shared/Table';
import Actions from '../shared/Actions';
import validator, { field } from '../shared/validations/validator';

export default class CreateOrEditSignatureStep4ExternalReferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: [],
      increment_index: 0,
      fields: {
        references: field({ name: 'references', value: '', isRequired: false, pattern: /((http|ftp|https):\/\/)*[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/ }),
        webServer: field({ name: 'webServer', value: '', isRequired: false })
      }
    };
    this.webServerHeader = ['Web Server', 'Actions'];
    this.dataHeader = ['Reference', 'Type', 'Actions'];
  }

  onChange = ({ target: { name, value } }) => this.validate(name, value);

  validate = (fieldName, value) => {
    return new Promise(resolve => {
      const errors = validator(fieldName, value, this.state.fields[fieldName].validations);
      this.state.error = [...errors]

      const field = {
        ...this.state.fields[fieldName],
        value,
        isPristine: false,
        errors,
      };

      this.setState({
        fields: {
          ...this.state.fields,
          [fieldName]: field
        }
      }, () => resolve(field));
    });
  }

  ifInputRefValid = () => {
    this.setState({ increment_index: this.state.increment_index + 1 });
    const reference = document.querySelector('#referenceId').value;
    if (reference && this.state.error.length == 0) {
      this.props.addToStateArray('external_references', { id: `NEW_${this.state.increment_index}`, reference: reference, type: document.querySelector('#inputType').value })
    }
  }

  ifInputWebValid = () => {
    this.setState({ increment_index: this.state.increment_index + 1 });
    const webServer = document.querySelector('#webServerName').value;
    if (webServer && this.state.error.length === 0) {
      this.props.addToStateArray('web_servers', { id: `NEW_${this.state.increment_index}`, web: webServer });
    }
  }

  isAllValid = async () => {
    const fields = {};

    for await (const validateField of Object.keys(this.state.fields).map(field => this.validate(field, this.state.fields[field].value))) {
      fields[validateField.name] = validateField;
    }

    this.setState({ fields });
    Object.keys(this.state.fields).forEach(field => this.validate(field, this.state.fields[field].value));
    return Object.keys(this.state.fields).every(field => !this.state.fields[field].isPristine && this.state.fields[field].errors.length == 0);
  }

  componentWillReceiveProps = (props, state) => {
    const { signatureData } = props;
    this.setState({
      fields:
      {
        references: field({ name: 'references', value: '', isRequired: false, pattern: /((http|ftp|https):\/\/)*[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/ }),
        webServer: field({ name: 'webServer', value: '', isRequired: false })
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <h5 className="mt-3">External references</h5>
        <div className="row ml-2 input-group">
          <div className="input-group-append col-md-4 mb-2 col-xs-4">
            <FontAwesomeIcon className="mt-2 fa-lg mr-2" icon={faLink}></FontAwesomeIcon>
            <input
              className="form-control"
              placeholder="Reference"
              type="text"
              id="referenceId"
              name="references"
              defaultValue={this.state.fields.references.value}
              onBlur={this.onChange}
            />
          </div>
          <div className="input-group col-md-5">
            <label className="mb-3 mt-1">
              <FontAwesomeIcon className="mt-2 fa-lg mr-2" icon={faTextHeight}></FontAwesomeIcon>
            </label>
            <select id="inputType" className="form-control">
              <option selected>CveId</option>
              <option>BugTraqId</option>
              <option>Other</option>
            </select>
            <div className="col-md-5 col-xl-3 col-lg-4">
              <button type="button" className="btn btn-secondary btn-block ml-3 " onClick={this.ifInputRefValid}>Add</button>
            </div>
          </div>
          <div className="col-md-2 col-xs-4 mb-2"></div>
          <div>
            {
              this.state.fields.references.errors.map((error, index) => (
                <small key={index} className="form-text text-danger">{error}</small>
              ))
            }
          </div>
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
              <input
                type="text"
                className="form-control"
                id="webServerName"
                placeholder="Web Server"
                name="webServer"
                defaultValue={this.state.fields.webServer.value}
                onBlur={this.onChange}
              ></input>
              <div className="input-group-append">
                <button type="button" className="btn btn-secondary" onClick={this.ifInputWebValid}>Add</button>
              </div>
            </div>
          </div>
          <div className="col-md-9"></div>
        </div>
        {this.state.fields.webServer.errors.map((error, index) => (
          <small key={index} className="form-text text-danger">{error}</small>
        ))}
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