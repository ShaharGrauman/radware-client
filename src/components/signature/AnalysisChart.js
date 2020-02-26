import React, { Component } from 'react'
import axios from 'axios';
import CanvasJSReact from '../shared/OurCanvasjs/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class SignatureLifeCycleAnalytics extends Component {

    componentDidMount() {
        //Get signature data from SERVER
        
        // const analizedData = [];
        // axios.get('http://localhost:3001/signature/analysis')
        //     .then(fulfilled => { }, rejected => { });
        // Analyze data and map it how we want
        //this.setState({ data: [] }); 
    }

    constructor(props) {
        super(props);
        let i = 0;
        this.state = {
            data: [
                { y: 2200000000, label: `In QA (${++i})` },
                { y: 1800000000, label: `In Progress (${++i})` },
                { y: 800000000, label: `In Manual (${++i})` },
                { y: 563000000, label: `Qzone (${++i})` },
                { y: 376000000, label: `Weibo (${++i})` },
                { y: 336000000, label: `Twitter (${++i})` },
                { y: 330000000, label: `Reddit (${++i})` }
            ]
        }
    }
    render() {

        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                //text: "Analysis"
                text: "Signature life cycle"
            },
            axisX: {
                //title: "Signature life cycle",
                reversed: true,
            },
            axisY: {
                //title: "Signature life cycle",
                labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints: this.state.data
            }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
    addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
}