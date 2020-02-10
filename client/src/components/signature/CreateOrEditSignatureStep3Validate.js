import React from 'react';

import Table from '../shared/Table';
import Scanat from './Scanat';

export default class CreateOrEditSignatureStep3Validate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            get: 'Access-Control-Request-Headers: content-type Access-Control-Request-Method: GET',
            post: 'Access-Control-Request-Headers: content-type Access-Control-Request-Method: POST'
        }
        this.extendedTextHeaders = ['Description', 'Order', 'Actions'];
    }
    
    useGetClick = () => {
        document.querySelector('#txtTextAreaUseMethods').value = this.state.get;
    }
    usePostClick = () => {
        document.querySelector('#txtTextAreaUseMethods').value = this.state.post;
    }

    render() {
        return (
            <div>
                <div className="container-fluid row">
                    <div className="col-md-6">
                        <h5 className="display-5"> 1.Review the vulrability data</h5>
                        <div className="form-check">
                            <input type="radio" name="simpleOrExtendedText" id="rbSimpleText" value="SimpleText" checked={this.props.signatureData.simpleOrExtendedText === 'SimpleText'} disabled="true" onClick={this.simpleOrExtendedTextClick} />
                            <label className="form-check-label" for="rbSimpleText">Simple text</label>
                            <input type="text" class="form-control" id="text" value={this.props.signatureData.txtSimpleText} disabled></input>
                            <div className="form-group form-check">
                                <input className="form-check-input" type="checkbox" id="cbToggleshowRegular" checked={this.props.signatureData.showRegularInStep2} onClick={this.props.toggleshowRegularInStep2} disabled="true" />
                                <label className="form-check-label" for="cbToggleshowRegular">Regular expression</label>
                            </div>
                        </div>
                        <div className="row container">
                            <div className="form-check col">
                                <input type="radio" name="simpleOrExtendedText" id="rbExtendedText" value="ExtendedText" checked={this.props.signatureData.simpleOrExtendedText === 'ExtendedText'} disabled="true" onClick={this.simpleOrExtendedTextClick} />
                                <label className="form-check-label" for="rbExtendedText">Extended text</label>
                            </div>
                            <div className="custom-control custom-switch col">
                                <input name="keep_order" checked={this.props.signatureData.keep_order} onChange={this.props.onChangeHandler} disabled="true" type="checkbox" className="custom-control-input" id="toggle"></input>
                                <label className="custom-control-label" for="toggle">Keep order</label>
                            </div>
                        </div>
                        <Table headers={this.extendedTextHeaders} data={this.props.signatureData.vuln_data_extras.map(data => { return ({ parameter: data.description }); })} />
                        <hr />
                        <Scanat signatureData={this.props.signatureData} disabled={true} />
                        <hr />
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" name="setStartBreak" disabled checked={this.props.signatureData.setStartBreak}></input> Set Start Break
                                </label>
                            <div className="radio ml-4">
                                <label className="form-check form-check-inline">
                                    <input readOnly type="radio" name="start_break" value="setStartBreakByFileName" checked={this.props.signatureData.start_break === 'setStartBreakByFileName'} disabled></input>
                                    <label className="ml-1">By FILENAME (?)</label>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input type="radio" name="start_break" value="setStartBreakByAlpha" checked={this.props.signatureData.start_break === 'setStartBreakByAlpha'} disabled></input>
                                    <label className="ml-1">By Alpha (?)</label>
                                </label>
                            </div>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" name="setEndBreak" disabled checked={this.props.signatureData.setEndBreak}></input> Set End Break
                                </label>
                            <div className="radio ml-4">
                                <label className="form-check form-check-inline">
                                    <input type="radio" name="end_break" value="setEndBreakByFileName" checked={this.props.signatureData.end_break === 'setEndBreakByFileName'} disabled></input>
                                    <label className="ml-1">By FILENAME (?)</label>
                                </label>
                                <label className="form-check form-check-inline">
                                    <input type="radio" name="end_break" value="setEndBreakByAlpha" checked={this.props.signatureData.end_break === 'setEndBreakByAlpha'} disabled></input>
                                    <label className="ml-1">By Alpha (?)</label>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h5>2.Set the test data for it</h5>
                        <div className="row">
                            <div className="col-md-4 mb-2">
                                <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.useGetClick}>Use Get</button>
                            </div>
                            <div className="col-md-4">
                                <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.usePostClick}>Use Post</button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <br></br>
                            <textarea class="form-control" id="txtTextAreaUseMethods" rows="18"></textarea>
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