import React, { Component } from 'react'
import {withRouter} from "react-router-dom"


// import CanvasJSReact from '../../shared/canvasjs.react';
// import { CanvasJS } from '../../shared/canvasjs.react';
// import { CanvasJSChart} from '../../shared/canvasjs.react';

import  CanvasJSReact from '../../shared/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AttacksOrSeverityChart extends Component {
constructor(props){
    super(props);
    this.chartType='';
    this.options={}


    this.stamData=[
        {   attack_id: 1,
            SigCount: 6,
            attack: {name: "attack 1"}
        },
        {   attack_id: 2,
            SigCount: 16,
            attack: {name: "attack 2"}
        },
        {   attack_id: 3,
            SigCount: 2,
            attack: {name: "attack 3"}
        },
        {   attack_id: 4,
            SigCount: 9,
            attack: {name: "attack 4"}
        },
        {   attack_id: 5,
            SigCount: 15,
            attack: {name: "attack 5"}
        }
    ]
}
componentWillMount =() =>{
    this.chartType=this.props.match.params.type
    // try{
    //     const {data} = await axios.get(requestURL,{withCredentials: true});
        
    //   }catch(error){
    //     this.setState({
    //       errorMsg: 'Inalid email or password'
    //     });
    //   }
    // let data=this.stamData;
    let data=this.stamData.map(attack=>(
        {  y: attack.SigCount, indexLabel: attack.attack.name }
        ))
    console.log('data',data)

        const options = {
            theme: "light2",
            title:{
                text: `${this.chartType} chart`
            },		
            data: [
            {       
                type: "pie",
                showInLegend: true,
                toolTipContent: "{y} - #percent %",
                yValueFormatString: "#",
                legendText: "{indexLabel}",
                dataPoints: data
            }
            ]
        }
        this.options=options;


}
render() {
    
   return (
      <>
      <div className="container">
  <div className="row">
    <div className="col-sm">
    <CanvasJSChart options = {this.options}/>
    </div>
    <div className="col-2">
    </div>
    <div className="col-sm">
    <CanvasJSChart options = {this.options}/>
    </div>
  </div>
</div>
     
      </>
    );
  }

}
export default withRouter(AttacksOrSeverityChart)
