import React, { Component } from 'react';

class CreateOrEditSignatureStep5Attributes extends Component {
  render() {
    return (
      <div>
        <div className="container ml-2 mt-2">
          <div className="row">
            <div className="col-md-2">
              <label className="my-1 mr-2" for="Left">Left Index</label>
            </div>
            <div className="col">
              <select name="left_index" className="custom-select my-1 mr-sm-2" id="Left" value={this.props.signatureData.left_index} onChange={this.props.onChangeHandler}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <label className="my-1 mr-2" for="Right">Right Index</label>
            </div>
            <div className="col">
              <select name="right_index" className="custom-select my-1 mr-sm-2" id="Right" value={this.props.signatureData.right_index} onChange={this.props.onChangeHandler}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row ml-2">
          <div className="col-md-4 mb-4 col-sm-3 col-4"></div>
          <div class="col-md-4 col-sm-3 mb-4 col-6"></div>
        </div>
      </div>
    );
  }
}

export default CreateOrEditSignatureStep5Attributes;