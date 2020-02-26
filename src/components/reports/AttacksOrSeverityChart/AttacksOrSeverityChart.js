import React, { Component } from 'react'
import {withRouter} from "react-router-dom"
import {getSigByAttacks} from '../../../api/controllers/reports';


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
    this.state={
        options:{}

    }

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
componentWillMount =async () =>{
    this.chartType=this.props.match.params.type
    let dataForChart=[];
    try{
        const data = await getSigByAttacks();
        dataForChart=data.map(attack=>(
            // console.log(attack)
            attack.attack!=null?
            { label: attack.attack.name,  y: attack.SigCount  }
            :
            { label: 'undefined',  y: 0  }
            ))
            console.log('dataForChart',data,dataForChart)

      }catch(error){
        this.setState({
          errorMsg: 'Inalid email or password'
        });
      }
console.log('dataForChart',dataForChart)
    // let data=this.stamData;
    // let data=this.stamData.map(attack=>(
    //     {  y: attack.SigCount, indexLabel: attack.attack.name }
    //     ))
    // const data=this.data.map(attack=>(
    //     { label: attack.attack.name,  y: attack.SigCount  }
    //     ))
    // console.log('data',data)
    // let data=dataForChart;
        const  options = {
            title: {
              text: "Attacks percentage Chart"
            },
            data: [{				
                      type: "column",
                    //   dataPoints: [
                    //       { label: "Apple",  y: 10  },
                    //       { label: "Orange", y: 15  },
                    //       { label: "Banana", y: 25  },
                    //       { label: "Mango",  y: 30  },
                    //       { label: "Grape",  y: 28  }
                    //   ]
                      dataPoints: dataForChart
             }]
         }
        // this.options=options;
         this.setState({options:options})

}
render() {
    
   return (
      <>
      <div className="container">
  <div className="row">
    <div className="col-sm">
    <CanvasJSChart options = {this.state.options}/>
    </div>
    <div className="col-2">
    </div>
    <div className="col-sm">
    {/* <CanvasJSChart options = {this.options}/> */}
    </div>
  </div>
</div>
     
      </>
    );
  }

}
export default withRouter(AttacksOrSeverityChart)
