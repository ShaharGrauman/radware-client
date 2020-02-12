import React from 'react';

export default class Status extends React.Component {
  render() {
    const status = ['Choose...', 'in_progress', 'in_qa', 'in_test', 'published', 'Suspended', 'deleted'];

    return (
      <div className="col-lg-5 col-md-5 col-sm-10 col-xs-8">
        <h5>Status:</h5>
        <small>Choose the status</small>
        <select name="status" className="form-control" value={this.props.status} onChange={this.props.onChangeHandler}>
          {
            status.map((s, index) => <option key={index}>{s}</option>)
          }
        </select>
      </div>
    );
  }
}
