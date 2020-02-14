import React from "react";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Table from '../shared/Table'

export default class EditSignatures extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data: [
                {Date:"17-Mar-2020",Who:"Shai Radware",Status:"In process"},
                {Date:"17-Mar-2020",Who:"Shai Radware",Status:"In process"},
                {Date:"17-Mar-2020",Who:"Shai Radware",Status:"In process"},
                {Date:"17-Mar-2020",Who:"Shai Radware",Status:"In process"},
                {Date:"17-Mar-2020",Who:"Shai Radware",Status:"In process"},
                {Date:"17-Mar-2020",Who:"Shai Radware",Status:"In process"},
                {Date:"17-Mar-2020",Who:"Shai Radware",Status:"In process"}]
        };
        this.dataheaders=['Date','Who','Status']
    }
    render(){
        return(
       <>
        <div class="class="container>
            <div class="container ml-0">
                <h2 class="ml-2 mb-3">Signature history</h2>
                <div class="row">
                    <div className="col-10">
                        <Table headers={this.dataheaders} data={this.state.data} />
                    </div>
                </div>
                {/* <div class="row">
                <button type="button" class="ml-2 mr-4 btn btn-secondary">Cancel</button>
                <button type="button" class="ml-2 mr-4 btn btn-secondary">Save</button>
            </div> */}
            </div>
        </div>
        </>
        );
    }
}


