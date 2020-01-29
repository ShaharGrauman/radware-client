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
            },
            {
                ParamName: 'Mariah Maclachlan',
                actions: [<Actions />]
            }
        ];
    }

    render() {
        return (
            <div>
                <div className="row ml-4">
                    <h3>Define vulnerability by:</h3>
                </div>
                <div className="row ml-3 mt-4">
                    <div className="col-md-4">
                        <div>
                            <input type="radio" name="radio1" checked /> Simple text:
                        </div>
                        <input type="text" className="mt-2 form-control" placeholder="Add text"></input>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                            <label className="form-check-label" for="defaultCheck1">Regular expression</label>
                        </div>
                        <div className="mt-3">
                            <label>Test Text : </label>
                            <textarea type="text" className="form-control" id="testText" placeholder="Add text"></textarea>
                        </div>
                        <div className="mt-2 mb-2">
                            <button className="btn btn-block btn-secondary">Test</button>
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-md-5">
                        <input type="radio" name="radio2" /> Extended text
                        <div className="custom-control custom-switch float-right">
                            <input type="checkbox" className="custom-control-input" id="toggle"></input>
                            <label className="custom-control-label" for="toggle">Keep Order</label>
                        </div>
                        <div>
                            <input type="text" className="mt-2 form-control" placeholder="Add text"></input>
                            <button className="btn btn-block btn-secondary mt-2 mb-3">Add</button>
                        </div>
                        <Table headers={this.dataHeader} data={this.data} />
                    </div>
                </div>
                <hr />
                <div className="row ml-3">
                    <div className="col-md-4">
                        <h3>Scan at : </h3>
                        <div className="col">
                            <div className="form-check form-check-inline">
                                <input name="scanAtScanURl" checked={this.props.signatureData.scanAtScanURl} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" for="inlineCheckbox1">Scan URl</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input name="scanAtScanParameters" checked={this.props.signatureData.scanAtScanParameters} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" for="inlineCheckbox2">Scan Parameters</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input name="scanAtScanBody" checked={this.props.signatureData.scanAtScanBody} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" for="inlineCheckbox3">Scan Body</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input name="scanAtScanFilename" checked={this.props.signatureData.scanAtScanFilename} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" onChange={this.props.onChangeHandler} for="inlineCheckbox4">Scan Filename</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input name="scanAtScanHeaders" checked={this.props.signatureData.scanAtScanHeaders} onChange={this.props.onChangeHandler} className="form-check-input" type="checkbox" />
                                <label className="form-check-label" for="inlineCheckbox5">Scan Headers</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-md-5">
                        <input type="text" className="mt-2 form-control" placeholder="Add Parameters"></input>
                        <button className="btn btn-block btn-secondary mt-2 mb-3">Add Parameters</button>
                        <Table headers={this.paramHeader} data={this.param} />
                    </div>
                </div>
                <hr />
                <div className="row ml-3">
                    <div className="col-md-12">
                        <div className="ml-4 mt-3">
                            <div className="checkbox ml-1">
                                <label>
                                    <input type="checkbox" name="setStartBreak" checked={this.props.signatureData.setStartBreak} onChange={this.props.onChangeHandler}></input> Set Start Break
                                </label>
                                <div className="radio ml-4">
                                    <label className="form-check form-check-inline">
                                        <input type="radio" name="rbSetStartBreak" value="setStartBreakByFileName" checked={this.props.signatureData.rbSetStartBreak === 'setStartBreakByFileName'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setStartBreak}></input>
                                        <small className="ml-1">By FILENAME (?)</small>
                                    </label>
                                    <label className="form-check form-check-inline">
                                        <input type="radio" name="rbSetStartBreak" value="setStartBreakByAlpha" checked={this.props.signatureData.rbSetStartBreak === 'setStartBreakByAlpha'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setStartBreak}></input>
                                        <small className="ml-1">By Alpha (?)</small>
                                    </label>
                                </div>
                            </div>
                            <div className="checkbox ml-1">
                                <label>
                                    <input type="checkbox" name="setEndBreak" checked={this.props.signatureData.setEndBreak} onChange={this.props.onChangeHandler}></input> Set End Break
                                </label>
                                <div className="radio ml-4">
                                    <label className="form-check form-check-inline">
                                        <input type="radio" name="rbSetEndBreak" value="setEndBreakByFileName" checked={this.props.signatureData.rbSetEndBreak === 'setEndBreakByFileName'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setEndBreak}></input>
                                        <small className="ml-1">By FILENAME (?)</small>
                                    </label>
                                    <label className="form-check form-check-inline">
                                        <input type="radio" name="rbSetEndBreak" value="setEndBreakByAlpha" checked={this.props.signatureData.rbSetEndBreak === 'setEndBreakByAlpha'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setEndBreak}></input>
                                        <small className="ml-1">By Alpha (?)</small>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}