import React from 'react';
import Table from '../shared/Table';
import Scanat from './Scanat';
import validator, { field } from '../shared/validations/validator';

export default class CreateOrEditSignatureStep3Validate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            get: 'GET <URI> HTTP Host: \n10.205.156.51 - default IP , but need to be configurable. Connection: close',
            post: 'POST <URI>  HTTP/1.1\nHost: 10.205.156.51\nReferer: attackscript.perl\nContent-Type: application/x-www-form-urlencoded\nCache-Control: no-cache Accept-Encoding: identity\nConnection: close\nContent-Length: <Length>\n',
            postWithFile: 'POST /fileupload HTTP/1.1\nHost: 10.205.156.51\nConnection: keep-alive\nContent-Type: multipart/form-data; boundary=----WebKitFormBoundaryvBPvHMl1WIB2BGQ4\nAccept: */*\nAccept-Encoding: gzip, deflate, br\nAccept-Language: en-US,en;q=0.9,he;q=0.8\nContent-Length: 403\n------WebKitFormBoundaryvBPvHMl1WIB2BGQ4\nContent-Disposition: form-data; name="filesUploaded"; filename="my_filename.txt"\nContent-Type: text/plain\nmy_content\n------WebKitFormBoundaryvBPvHMl1WIB2BGQ4\nContent-Disposition: form-data; name="category"\nfile\n------WebKitFormBoundaryvBPvHMl1WIB2BGQ4\nContent-Disposition: form-data; name="comments"\n0\n------WebKitFormBoundaryvBPvHMl1WIB2BGQ4--',
            fields: {
                texPostOrGet: field({ name: 'texPostOrGet', value: '', isRequired: false })
            }
        }
        this.extendedTextHeaders = ['Description', 'Order', 'Actions'];
    }

    useGetClick = () => {
        this.props.signatureData.test_data = document.querySelector('#txtTextAreaUseMethods').value = this.state.get;
    }

    usePostClick = () => {
        this.props.signatureData.test_data = document.querySelector('#txtTextAreaUseMethods').value = this.state.post;
    }
    
    usePostWithFileClick = () => {
        this.props.signatureData.test_data = document.querySelector('#txtTextAreaUseMethods').value = this.state.postWithFile;
    }
    
    validate = (fieldName, value) => {
        value = this.state.fields.value = this.props.signatureData.test_data;
        return new Promise(resolve => {
            const errors = validator(fieldName, value, this.state.fields[fieldName].validations);
            const field = {
                ...this.state.fields[fieldName],
                value,
                isPristine: false,
                errors
            };

            this.setState({
                fields: {
                    ...this.state.fields,
                    [fieldName]: field
                }
            }, () => resolve(field));
        });
    }

    isAllValid = async () => {
        const fields = {};

        for await (const validateField of Object.keys(this.state.fields).map(field => this.validate(field, this.state.fields[field].value))) {
            fields[validateField.name] = validateField;
        }

        this.setState({
            fields
        });
        return Object.keys(this.state.fields).every(field => !this.state.fields[field].isPristine && this.state.fields[field].errors.length == 0);
    }

    componentWillReceiveProps = (props, state) => {
        const { signatureData } = props;
        this.setState({
            fields:
            {
                texPostOrGet: field({ name: 'texPostOrGet', value: signatureData.texPostOrGet, isRequired: false })
            }
        });
    }

    render() {
        return (
            <div>
                <div className="container-fluid row">
                    <div className="col-md-6">
                        <h5 className="display-5"> 1.Review the vulrability data</h5>
                        <div className="form-check">
                            <input type="radio" name="simpleOrExtendedText" id="rbSimpleText" value="SimpleText" checked={this.props.signatureData.simpleOrExtendedText === 'SimpleText'} disabled={true} onClick={this.simpleOrExtendedTextClick} />
                            <label className="form-check-label" for="rbSimpleText">Simple text</label>
                            <input type="text" class="form-control" id="text" value={this.props.signatureData.vuln_data} disabled></input>
                            <div className="form-group form-check">
                                <input className="form-check-input" type="checkbox" id="cbToggleshowRegular" checked={this.props.signatureData.showRegularInStep2} onClick={this.props.toggleshowRegularInStep2} disabled={true} />
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
                        <Table headers={this.extendedTextHeaders} data={this.props.signatureData.vuln_data_extras.map(data => { return ({ Vuln_text: data.description }); })} />
                        <hr />
                        <Scanat signatureData={this.props.signatureData} disabled={true} />
                        <hr />
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" name="setStartBreak" disabled checked={this.props.signatureData.start_break}></input> Set Start Break
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
                                <input type="checkbox" name="setEndBreak" disabled checked={this.props.signatureData.end_break}></input> Set End Break
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
                            <div className="col-md-4 mb-2">
                                <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.usePostClick}>Use Post</button>
                            </div>
                            <div className="col-md-4">
                                <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.usePostWithFileClick}>Use Post With File</button>
                            </div>
                        </div>
                        <div class="mb-3">
                            <br></br>
                            <div class="form-group">
                                <textarea class="form-control" id="txtTextAreaUseMethods" defaultValue={this.props.signatureData.test_data} onChange={this.props.onChangeHandler} name="test_data" rows="18"></textarea>
                            </div>
                        </div>
                        {this.state.fields.texPostOrGet.errors.map((error, index) => (
                            <small key={index} className="form-text text-danger">{error}</small>
                        ))}
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12"></div>
                </div>
            </div>
        );
    }
}