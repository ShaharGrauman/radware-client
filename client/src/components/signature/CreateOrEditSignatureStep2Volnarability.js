import React from "react";

import Table from '../shared/Table'
import Actions from '../shared/Actions';

export default class CreateOrEditSignatureStep2Volnarability extends React.Component {
    constructor(props) {
        super(props);
        this.dataHeader = ['Vuln text', 'Order', 'Actions'];
        this.paramHeader = ['Param name	', 'Actions'];
        this.data = [
            {
                vulnText: 'Giacomo Guilizzoni',
                order: '^v',
                actions: [<Actions />]
            },
            {
                vulnText: 'Marco Botton',
                order: '^v',
                actions: [<Actions />]
            },
            {
                vulnText: 'Mariah Maclachlan',
                order: '^v',
                actions: [<Actions />]
            },
        ];
        this.param = [
            {
                ParamName: 'GiacomoGuilizzoni',
                actions: [<Actions />]
            },
            {
                ParamName: 'Marco Botton',
                actions: [<Actions />]
            }
        ];
    }

    render() {
        return (
            <>
                <div className="row ml-4">
                    <h5>Define vulnerability by:</h5>
                </div>
                <div className="row ml-3 mt-4">
                    <div className="col-md-6">
                        <div>
                            <input type="radio" name="radio1" checked /> Simple text:
                        </div>
                        <input type="text" className="mt-2 form-control" placeholder="Add text"></input>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">Regular expression</label>
                        </div>
                        <div className="mt-3">
                            <label>Test text: </label>
                            <textarea rows="7" type="text" className="form-control" id="testText" placeholder="Add text"></textarea>
                        </div>
                        <div className="mt-2 mb-2">
                            <button className="btn btn-block btn-secondary">Test</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <input type="radio" name="radio2" /> Extended text
                        <div className="custom-control custom-switch float-right">
                            <input name="keep_order" checked={this.props.signatureData.keep_order} onChange={this.props.onChangeHandler} type="checkbox" className="custom-control-input" id="toggle"></input>
                            <label className="custom-control-label" for="toggle">Keep order</label>
                        </div>
                        <div>
                            <div className="input-group sm-3 mb-2" >
                                <input type="text" className="form-control" name="Add text" placeholder="Add text"></input>
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-secondary">Add text</button>
                                </div>
                            </div>
                        </div>
                        <Table headers={this.dataHeader} data={this.data} />
                    </div>
                </div>
                <hr />
                <div className="row ml-3">
                    <div className="col-md-6">
                        <h6>Scan at : </h6>
                        <div className="row container">
                            <div className="form-check form-check-inline col">
                                <input name="scanAtScanURl" checked={this.props.signatureData.scanAtScanURl} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" for="inlineCheckbox1">Scan URl</label>
                            </div>
                            <div className="form-check form-check-inline col">
                                <input name="scanAtScanParameters" checked={this.props.signatureData.scanAtScanParameters} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" for="inlineCheckbox2">Scan Parameters</label>
                            </div>
                        </div>
                        <div className="row container">
                            <div className="form-check form-check-inline col">
                                <input name="scanAtScanBody" checked={this.props.signatureData.scanAtScanBody} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" for="inlineCheckbox3">Scan Body</label>
                            </div>
                            <div className="form-check form-check-inline col">
                                <input name="scanAtScanFilename" checked={this.props.signatureData.scanAtScanFilename} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" onChange={this.props.onChangeHandler} for="inlineCheckbox4">Scan Filename</label>
                            </div>
                        </div>
                        <div className="row container">
                            <div className="form-check form-check-inline">
                                <input name="scanAtScanHeaders" checked={this.props.signatureData.scanAtScanHeaders} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" for="inlineCheckbox5">Scan Headers</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className="input-group sm-3 mb-2" >
                                <input type="text" className="form-control" name="add parameters" placeholder="Add parametrs"></input>
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-secondary">Add parameters</button>
                                </div>
                            </div>
                        <Table headers={this.paramHeader} data={this.param} />
                    </div>
                </div>
                <div>
                    <hr />
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="setStartBreak" checked={this.props.signatureData.setStartBreak} onChange={this.props.onChangeHandler}></input> Set Start Break
                                </label>
                        <div className="radio ml-4">
                            <label className="form-check form-check-inline">
                                <input type="radio" name="start_break" value="setStartBreakByFileName" checked={this.props.signatureData.start_break === 'setStartBreakByFileName'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setStartBreak}></input>
                                <label className="ml-1">By FILENAME (?)</label>
                            </label>
                            <label className="form-check form-check-inline">
                                <input type="radio" name="start_break" value="setStartBreakByAlpha" checked={this.props.signatureData.start_break === 'setStartBreakByAlpha'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setStartBreak}></input>
                                <label className="ml-1">By Alpha (?)</label>
                            </label>
                        </div>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="setEndBreak" checked={this.props.signatureData.setEndBreak} onChange={this.props.onChangeHandler}></input> Set End Break
                                </label>
                        <div className="radio ml-4">
                            <label className="form-check form-check-inline">
                                <input type="radio" name="end_break" value="setEndBreakByFileName" checked={this.props.signatureData.end_break === 'setEndBreakByFileName'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setEndBreak}></input>
                                <label className="ml-1">By FILENAME (?)</label>
                            </label>
                            <label className="form-check form-check-inline">
                                <input type="radio" name="end_break" value="setEndBreakByAlpha" checked={this.props.signatureData.end_break === 'setEndBreakByAlpha'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setEndBreak}></input>
                                <label className="ml-1">By Alpha (?)</label>
                            </label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}