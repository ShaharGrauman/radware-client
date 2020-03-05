import React from "react";
import SwitchableComponent from "./SwitchableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThermometerEmpty, faThermometerHalf, faThermometerFull } from "@fortawesome/free-solid-svg-icons";

export default class SeverityRange extends SwitchableComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      disableDiv: false,
      severity: "2"
    }
  }

  onChange = e => {
    let valueText = '';
    this.setState({ severity: e.target.value == 0 ? "2" : e.target.value })
    switch (e.target.value) {
      case '0':
        return this.props.onSelect('severity', '');
      case '1':
        return this.props.onSelect('severity', 'low');
      case '2':
        return this.props.onSelect('severity', 'medium');
      case '3':
        return this.props.onSelect('severity', 'high');
      default:
        return this.props.onSelect('severity', '');
    }
  }
  render() {
    var divStyle = {
      pointerEvents: this.state.disableDiv ? 'auto' : 'none', opacity: this.state.disableDiv ? 1 : 0.3
    };
    return (
      <>
        <div class="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="customSwitch2" onClick={() => {
            const switchState = this.state.disableDiv;
            this.setState({ disableDiv: !switchState });
            if (switchState) {
              this.setState({ severity: "2" })
              this.onChange({ target: { value: 0 } })
            } else {
              this.onChange({ target: { value: "2" } })
            }
          }} ></input>
          <label className="custom-control-label" for="customSwitch2">Severity</label>
        </div >
        <input
          type="range"
          className="custom-range"
          min="1"
          max="3"
          step="1"
          value={this.state.severity}
          id="severity"
          dataSliderHandle="custom"
          style={divStyle}
          onChange={this.onChange}
          disabled={!this.state.disableDiv}
        />

        <span className="row" style={divStyle}>
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
    )
  }
}