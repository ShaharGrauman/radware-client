import React from "react";
import SwitchableComponent from "./SwitchableComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerEmpty,
  faThermometerHalf,
  faThermometerFull
} from "@fortawesome/free-solid-svg-icons";

export default class SeverityRange extends SwitchableComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <>
        <label htmlFor="severity">Severity</label>

        <input
          type="range"
          className="custom-range"
          min="1"
          max="3"
          step="1"
          defaultValue="2"
          id="severity"
          dataSliderHandle="custom"
          onChange={e => this.props.slidingRangeV(e.target.value)}
          disabled={this.state.disabled}
        />

        <span className="row">
          <span className="col-5">
            <FontAwesomeIcon
              size="2x"
              icon={faThermometerEmpty}
            ></FontAwesomeIcon>
          </span>
          <span className="col-5 mx-sm-1 mx-md-2 mx-lg-1">
            <FontAwesomeIcon
              size="2x"
              icon={faThermometerHalf}
            ></FontAwesomeIcon>
          </span>
          <span className="col-1">
            <FontAwesomeIcon
              size="2x"
              icon={faThermometerFull}
            ></FontAwesomeIcon>
          </span>
        </span>
      </>
    );
  }
}
