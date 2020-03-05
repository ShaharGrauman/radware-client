import React from 'react';
import Severity from './Severity';
import validator, { field } from '../shared/validations/validator';
import { getAttacks, getStatuses } from '../../api/controllers/signature';

export default class CreateOrEditSignatureStep1Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: field({ name: 'description', value: this.props.signatureData.description, isRequired: true, minLength: 3 }),
      attack_id: field({ name: 'attack_id', value: this.props.signatureData.attack_id, isRequired: true }),
      status: field({ name: 'status', value: this.props.signatureData.status, isRequired: true }),
      attacks: [],
      statuses: [],
      error: []
    };
  }

  onChange = ({ target: { name, value } }) => this.validate(name, value);

  validate = (fieldName, value) => {
    const errors = validator(fieldName, value, this.state[fieldName].validations);
    this.state.error = [...errors]

    this.setState({
      [fieldName]: {
        ...this.state[fieldName],
        value,
        isPristine: false,
        errors
      }
    });
  }

  isAllValid = () => {
    const keys = Object.keys(this.state).filter(field => 'name' in this.state[field]);
    keys.forEach(field => this.validate(field, this.state[field].value));
    return keys.every(field => !this.state[field].isPristine && this.state[field].errors.length === 0);
  }

  componentDidMount = async () => {
    const attacks = await getAttacks();
    const statuses = await getStatuses();
    this.setState({ attacks, statuses });
  }

  componentWillReceiveProps = (props, state) => {
    const { signatureData } = props;
    this.setState({
      description: {...this.state.description, value: signatureData.description},
      attack_id: {...this.state.attack_id, value: signatureData.attack_id},
      status: {...this.state.status, value: signatureData.status}
    });
  }

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
                <div className="input-group-append">
                  <select className="form-control" name="attack_id" value={this.props.signatureData.attack_id} onChange={this.props.onChangeHandler} onBlur={this.onChange}>
                    <option value="">Select Attack...</option>
                    {this.state.attacks.map(attack => <option key={attack.id} value={attack.id}>{attack.name}</option>)}
                  </select>
                </div>
                {this.state.attack_id.errors.map((error, index) => (
                  <small className="form-text text-danger" key={index}>{error}</small>
                ))}
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-10 col-xs-8">
              <h5>Status:</h5>
              <small>Choose the status</small>
              <select name="status" className="form-control" value={this.props.signatureData.status} onChange={this.props.onChangeHandler} onBlur={this.onChange}>
                <option value="">Select Status...</option>
                {this.state.statuses.map((status, index) => <option key={index} value={status}>{status}</option>)}
              </select>
              {this.state.status.errors.map((error, index) => (
                <small className="form-text text-danger" key={index}>{error}</small>
              ))}
            </div>
          </div>
          <div className="row ml-2 justify-content-around">
            <Severity severity={this.props.signatureData.severity} onChangeHandler={this.props.onChangeHandler} />
            <div className="col-lg-5 col-md-5 col-sm-10 col-xs-8"></div>
          </div>
          <div className="row justify-content-around">
            <div className="col-lg-11 ml-4 col-md-11 col-sm-10 col-xs-8" style={{ marginTop: 40 }}>
              <h5>Description:</h5>
              <div className="form-group shadow-textarea">
                <textarea
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