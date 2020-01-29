import React from 'react';

import Table from '../shared/Table';
import Scanat from './Scanat';

export default class CreateOrEditSignatureStep3Validate extends React.Component {
    render() {
        let tableData = [
            { Vuln_text: "Giacomo Guilizzoni" },
            { Vuln_text: "Marco Botton" },
            { Vuln_text: "Mariah Maclachlan" }
        ];
        return (
            <div>
                <div className="container-fluid row">
                    <div className="col-md-6">
                        <h5 className="display-5"> 1.Review the vulrability data</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked></input>
                            <label className="form-check-label" for="exampleRadios1">
                                Simple text
                                </label>
                            <input type="text" class="form-control" id="text"></input>
                            <div className="form-group form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                                <label className="form-check-label" for="exampleCheck1">Regular expression</label>
                            </div>
                        </div>
                        <div className="row container">
                            <div className="form-check col">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"></input>
                                <label className="form-check-label" for="exampleRadios2">
                                    Extended text
                                </label>
                            </div>
                            <div className="custom-control custom-switch col">
                                <input type="checkbox" class="custom-control-input" id="customSwitch1"></input>
                                <label className="custom-control-label" for="customSwitch1">Keep order</label>
                            </div>
                        </div>
                        <Table data={tableData} />
                        <hr></hr>
                        <Scanat />
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"></input>
                            <label className="form-check-label" for="defaultCheck1">
                                Set start break
                            </label>
                            <div className="row">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                                    <label className="form-check-label" for="inlineRadio1">by FILENAME(?)</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                                    <label className="form-check-label" for="inlineRadio2">by Alpha(?)</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2"></input>
                            <label className="form-check-label" for="defaultCheck2">
                                Set end break
                        </label>
                            <div className="row">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"></input>
                                    <label className="form-check-label" for="inlineRadio1">by FILENAME(?)</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"></input>
                                    <label className="form-check-label" for="inlineRadio2">by Alpha(?)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5>2.Set the test data for it</h5>
                        <div className="row">
                            <div className="col-md-4 mb-2">
                                <button type="button" class="btn btn-outline-secondary btn-block">Use Get</button>
                            </div>
                            <div className="col-md-4">
                                <button type="button" class="btn btn-outline-secondary btn-block">Use Post</button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <br></br>
                            <textarea class="form-control" id="validationTextarea" rows="18"></textarea>
                        </div>
                        <h6>File:</h6>
                        <button type="button" class="btn btn-outline-secondary btn-block">Attach</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12"></div>
                </div>
            </div>
        );
    }
}