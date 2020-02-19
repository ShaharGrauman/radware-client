import React, { Component } from 'react'
import BarChart from './AnalysisChart';

export default class SignatureLifeCycleAnalytics extends Component {
	render() {
		return (
			<div>				
				<p style={{textAlign:"center", margin:"50px",color:"grey"}}>Signature <b>created</b> at 02/02/2020 18:08:45</p>
				<BarChart />
				<p style={{textAlign:"center", margin:"50px",color:"grey"}}>Signature <b>published</b> at 06/02/2020 14:00:00</p>
			</div>
		)
	}
}
