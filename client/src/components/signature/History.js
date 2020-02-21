import React from "react";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Table from '../shared/Table'

export default class EditSignatures extends React.Component{
    constructor(props){
        super(props);
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
                        <Table data={this.props.signatureData.signature_status_histories.map(his => {
                                    return ({
                                        Status: his.status,
                                        Time: his.time,
                                        Date: his.date
                                    });
                                })} />
                    </div>
                </div>
            </div>
        </div>
        </>
        );
    }
}


