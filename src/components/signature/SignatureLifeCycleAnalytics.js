import React, { Component } from 'react'
import BarChart from './AnalysisChart';

export default class SignatureLifeCycleAnalytics extends Component {
	render() {
		return (
			<div>
				<p style={{ textAlign: "center", margin: "50px", color: "grey" }}>Signature <b>created</b> at {`${this.props.signatureData.creation_date.replace(/-/g, '/')} ${this.props.signatureData.creation_time}`} {}</p>
				<BarChart signatureData={this.props.signatureData}/>
				<p style={{textAlign:"center", margin:"50px",color:"grey"}}>Signature <b>published</b> at 06/02/2020 14:00:00</p>
			</div>
		)
	}
}