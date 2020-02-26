import React, { Component } from 'react'
import CanvasJSReact from '../shared/OurCanvasjs/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class SignatureLifeCycleAnalytics extends Component {

    componentDidMount() {
        //Get signature data from props
        const finalData = [];
        const mapping = {};
        this.props.signatureData.signature_status_histories.forEach(history => {
            if (mapping[history.status]) {
                mapping[history.status].count++;
                mapping[history.status].dates.push(history.date);
                mapping[history.status].times.push(history.time);
            }
            else {
                mapping[history.status] = {
                    count: 1,
                    dates: [history.date],
                    times: [history.time]
                };
            }
            console.log(mapping);
        });

        for (let status in mapping) {
            finalData.push({ y: this.getTimeDiff(mapping[status]), label: `${status} (${mapping[status].count})` });
        }

        this.setState({ data: finalData });
    }

    getTimeDiff = status => {
        const firstUpdateDate = status.dates[0].split('-');
        const firstUpdateTime = status.times[0].split(':');
        const firstUpdated = new Date(
            parseInt(firstUpdateDate[0]), parseInt(firstUpdateDate[1]) - 1, parseInt(firstUpdateDate[2]),
            parseInt(firstUpdateTime[0]), parseInt(firstUpdateTime[1]), parseInt(firstUpdateTime[2]), 0);
        if (status.count === 1) {
            const now = new Date();
            const diffTime = Math.abs(now - firstUpdated);
            return Math.floor(diffTime / 1000 / 60 / 60);
        } else {
            const lastUpdateDate = status.dates[status.dates.length - 1].split('-');
            const lastUpdateTime = status.times[status.times.length - 1].split(':');
            const lastUpdated = new Date(
                parseInt(lastUpdateDate[0]), parseInt(lastUpdateDate[1]) - 1, parseInt(lastUpdateDate[2]),
                parseInt(lastUpdateTime[0]), parseInt(lastUpdateTime[1]), parseInt(lastUpdateTime[2]), 0);
            const diffTime = Math.abs(lastUpdated - firstUpdated);
            return Math.floor(diffTime / 1000 / 60 / 60);
        }

    }

    constructor(props) {
        super(props);
        let i = 0;
        this.state = {
            data: [
                { y: 2200000000, label: `In Test (${++i})` },
                { y: 1800000000, label: `In Progress (${++i})` },
                { y: 800000000, label: `In QA (${++i})` },
                { y: 563000000, label: `Published (${++i})` },
                { y: 376000000, label: `Suspended (${++i})` },
                { y: 276000000, label: `Other (${++i})` }
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
        var suffixes = ["", "D", "W", "M"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }
}