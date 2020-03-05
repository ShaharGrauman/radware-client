import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { getSigByAttacks } from '../../../api/controllers/reports';
import CanvasJSReact from '../../shared/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AttacksOrSeverityChart extends Component {
  constructor(props) {
    super(props);
    this.chartType = '';
    this.state = {
      options: {}
    }

    this.stamData = [
      {
        attack_id: 1,
        SigCount: 6,
        attack: { name: "attack 1" }
      },
      {
        attack_id: 2,
        SigCount: 16,
        attack: { name: "attack 2" }
      },
      {
        attack_id: 3,
        SigCount: 2,
        attack: { name: "attack 3" }
      },
      {
        attack_id: 4,
        SigCount: 9,
        attack: { name: "attack 4" }
      },
      {
        attack_id: 5,
        SigCount: 15,
        attack: { name: "attack 5" }
      }
    ]
  }
  componentWillMount = async () => {
    this.chartType = this.props.match.params.type
    let dataForChart = [];
    try {
      const data = await getSigByAttacks();
      dataForChart = data.map(attack => (
        attack.attack != null ?
          { label: attack.attack.name, y: attack.SigCount }
          :
          { label: 'undefined', y: 0 }
      ))

    } catch (error) {
      this.setState({
        errorMsg: 'Inalid email or password'
      });
    }
    const options = {
      title: {
        text: "Attacks percentage Chart"
      },
      data: [{
        type: "column",
        dataPoints: dataForChart
      }]
    }
    this.setState({ options: options })
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <CanvasJSChart options={this.state.options} />
            </div>
            <div className="col-2"></div>
            <div className="col-sm"></div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(AttacksOrSeverityChart)
