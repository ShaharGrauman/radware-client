import React from "react";

import Table from '../shared/Table'
import Actions from '../shared/Actions';
import Scanat from "./Scanat";

export default class CreateOrEditSignatureStep2Volnarability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            increment_index: 0
        }
        this.extendedTextHeaders = ['Description', 'Order', 'Actions'];
    }

    simpleOrExtendedTextClick = event => {
        if (this.state.showRegularInStep2) {
            this.props.setLeftAndRightIndexes('0', '0');
        } else if (event.target.value === 'SimpleText') {
            this.props.setLeftAndRightIndexes('1', '2');
        } else {
            this.props.setLeftAndRightIndexes('2', '3');
        }
        this.props.onChangeHandler(event);
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
                            <input type="radio" name="simpleOrExtendedText" id="rbSimpleText" value="SimpleText" checked={this.props.signatureData.simpleOrExtendedText === 'SimpleText'} onClick={this.simpleOrExtendedTextClick} />
                            <label className="form-check-label" for="rbSimpleText">Simple text:</label>
                        </div>
                        <input type="text" className="mt-2 form-control" name="txtSimpleText" value={this.props.signatureData.txtSimpleText} onChange={this.props.onChangeHandler} placeholder="Add text"></input>
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="checkbox" id="cbToggleshowRegular" checked={this.props.signatureData.showRegularInStep2} onClick={this.props.toggleshowRegularInStep2} />
                            <label className="form-check-label" for="cbToggleshowRegular">Regular expression</label>
                        </div>
                        {
                            this.props.signatureData.showRegularInStep2 ?
                                <div className="mt-3">
                                    <label>Test text:</label>
                                    <textarea rows="7" type="text" className="form-control" name="txtTestText" value={this.props.signatureData.txtTestText} onChange={this.props.onChangeHandler} id="testText" placeholder="Add text"></textarea>
                                    <div className="mt-2 mb-2">
                                        <button className="btn btn-block btn-secondary">Test</button>
                                    </div>
                                </div> : null
                        }
                    </div>
                    <div className="col-md-6">
                        <input type="radio" name="simpleOrExtendedText" id="rbExtendedText" value="ExtendedText" checked={this.props.signatureData.simpleOrExtendedText === 'ExtendedText'} onClick={this.simpleOrExtendedTextClick} />
                        <label className="form-check-label" for="rbExtendedText">Extended text:</label>
                        <div className="custom-control custom-switch float-right">
                            <input name="keep_order" checked={this.props.signatureData.keep_order} onChange={this.props.onChangeHandler} type="checkbox" className="custom-control-input" id="toggle"></input>
                            <label className="custom-control-label" for="toggle">Keep order</label>
                        </div>
                        <div>
                            <div className="input-group sm-3 mb-2 mt-2">
                                <input type="text" className="form-control" name="txtExtendedText" value={this.props.signatureData.txtExtendedText} onChange={this.props.onChangeHandler} id="txtAddDataExtra" placeholder="Add text"></input>
                                <div className="input-group-append">
                                    <button type="button" className="btn btn-secondary" onClick={() => {
                                    this.setState({ increment_index: this.state.increment_index + 1 });
                                    this.props.addToStateArray('vuln_data_extras', { id: `NEW_${this.state.increment_index}`, description: document.querySelector('#txtAddDataExtra').value })
                                }}>Add parameter</button>
                                </div>
                            </div>
                        </div>
                        <Table headers={this.extendedTextHeaders} data={this.props.signatureData.vuln_data_extras.map(data => {
                            return ({ parameter: data.description, order: '^v', actions: [<Actions id={data.id} stateName="vuln_data_extras" excludeFromStateArrayById={this.props.excludeFromStateArrayById} />] });
                        })} />
                    </div>
                </div>
                <hr />
                <div className="row ml-3">
                    <div className="col-md-6">
                        <Scanat signatureData={this.props.signatureData} onChangeHandler={this.props.onChangeHandler} disabled={false} />
                    </div>
                    <div className="col-md-6">
                        <div className="input-group sm-3 mb-2" >
                            <input type="text" className="form-control" id="txtAddParameter" placeholder="Add parametrs"></input>
                            <div className="input-group-append">
                                <button type="button" className="btn btn-secondary" onClick={() => {
                                    this.setState({ increment_index: this.state.increment_index + 1 });
                                    this.props.addToStateArray('parameters', { id: `NEW_${this.state.increment_index}`, parameter: document.querySelector('#txtAddParameter').value })
                                }}>Add parameter</button>
                            </div>
                        </div>
                        <Table headers={this.parametersHeaders} data={this.props.signatureData.parameters.map(param => {
                            return ({ parameter: param.parameter, actions: [<Actions id={param.id} stateName="parameters" excludeFromStateArrayById={this.props.excludeFromStateArrayById} />] });
                        })} />
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
                                <input type="radio" id="filename1" name="start_break" value="setStartBreakByFileName" checked={this.props.signatureData.start_break === 'setStartBreakByFileName'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setStartBreak}></input>
                                <label className="ml-1" for="filename1">By FILENAME (?)</label>
                            </label>
                            <label className="form-check form-check-inline">
                                <input type="radio" id="alpha1" name="start_break" value="setStartBreakByAlpha" checked={this.props.signatureData.start_break === 'setStartBreakByAlpha'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setStartBreak}></input>
                                <label className="ml-1" for="alpha1">By Alpha (?)</label>
                            </label>
                        </div>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="setEndBreak" checked={this.props.signatureData.setEndBreak} onChange={this.props.onChangeHandler} />Set End Break
                        </label>
                        <div className="radio ml-4">
                            <label className="form-check form-check-inline">
                                <input type="radio" id="filename2" name="end_break" value="setEndBreakByFileName" checked={this.props.signatureData.end_break === 'setEndBreakByFileName'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setEndBreak}></input>
                                <label className="ml-1" for="filename2">By FILENAME (?)</label>
                            </label>
                            <label className="form-check form-check-inline">
                                <input type="radio" id="alpha2" name="end_break" value="setEndBreakByAlpha" checked={this.props.signatureData.end_break === 'setEndBreakByAlpha'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.setEndBreak}></input>
                                <label className="ml-1" for="alpha2">By Alpha (?)</label>
                            </label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}