import React, { Component } from "react";

export default class SearchRefinement extends Component {
  constructor(props){
    super(props);
    this.onChange = props.onChange;
  }
  render() {
    return (
      <>
        <select className="custom-select" onChange={this.onChange}>
          <option defaultValue>Refine your search</option>
          <option value="1">Enabling search refinement</option>
        </select>
      </>
    );
  }
}
