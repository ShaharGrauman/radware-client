import React from "react";

import QATable from './QATable';
import './QADashboard.css';

export default class QADashboard extends React.Component {
    state = {
        checkedOption : ''
    }
    constructor(props) {
        super(props);

        this.data = [
            {
                seq_id:1, 
                patternID: "AAA", 
                URI: "true",
                headers: "true",
                body:'true', 
                parameters: "true", 
                file: 'true',
                manualQa: "init",
                performance: "failed", 
                automation: 'passed'
            },

            {
                seq_id:2, 
                patternID: "BBB", 
                URI: "false",
                headers: "true",
                body:'true',  
                parameters: "true", 
                file: "true", 
                manualQa: "init",
                performance: "failed", 
                automation: 'passed'
            },

            {
                seq_id:3, 
                patternID: "CCC", 
                URI: "true",
                headers: "false", 
                body:'true', 
                parameters: "true", 
                file: "true", 
                manualQa: "init",
                performance: "init", 
                automation: 'passed'
            }
        ];
    }

    render() {
        return (
            <>
                <h2 className="ml-2 mb-3">QA dashboard</h2>
                <h5 className="ml-2 mb-3">Update signatures status at QA (signatures in QA status)</h5>
                <div className="container ml-0 mt-2">
                    <div className="row">
                        <div className="col">
                            <QATable data={this.data} checkedOption={this.state.checkedOption} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col">
                        <button className="btn btn-secondary mx-3 my-3" type="submit" width="150px">Update selected</button>

                        <button className="btn btn-secondary mx-3 my-3" type="submit" width="150px" >ALL FAILED</button>

                        <button className="btn btn-secondary mx-3 my-3" type="submit">ALL PASSED</button>
                    </div>
                </div>

            </>);

           

    }


}