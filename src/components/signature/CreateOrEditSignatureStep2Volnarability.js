import React from "react";
import Table from '../shared/Table';
import Actions from '../shared/Actions';
import Scanat from "./Scanat";
import validator, { field } from '../shared/validations/validator';

export default class CreateOrEditSignatureStep2Volnarability extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: [],
            matchFound: false,
            matchNotFound: false,
            fields: {
                txtExtendedText: field({ name: 'txtExtendedText', value: '', isRequired: true, minLength: 3 }),
                vuln_data: field({ name: 'vuln_data', value: this.props.signatureData.vuln_data, isRequired: true, minLength: 4 }),
                txtAddParameter: field({ name: 'txtAddParameter', value: '', isRequired: false, pattern: '^([a-zA-Z0-9.!#$%&*+/?^_`{|}~-]+=([a-zA-Z0-9.!#$%&*+/?^_`{|}~-]*)*)*$' })
            },
            isAdd: false,
            increment_index: 0,
            toggleShowSimpleText: true,
            toggleShowExtendedText: false
        }
        this.extendedTextHeaders = ['Description', 'Order', 'Actions'];
    }

    onChange = ({ target: { name, value } }) => this.validate(name, value);

    validate = (fieldName, value) => {

        return new Promise(resolve => {
            const errors = validator(fieldName, value, this.state.fields[fieldName].validations);
            this.state.error = [...errors];
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

        this.setState({ fields });

        return Object.keys(this.state.fields)
            .every(field => {
                if (this.state.fields[field].name === 'txtExtendedText' && this.state.toggleShowSimpleText || this.state.toggleShowExtendedText) return true;
                else if (this.state.fields[field].name === 'vuln_data' && this.state.toggleShowExtendedText) return true;
                return !this.state.fields[field].isPristine && this.state.fields[field].errors.length == 0;
            }) && (!this.state.toggleShowExtendedText || this.state.vulnDataExtrasValid);
    }

    componentWillReceiveProps = (props, state) => {
        const { signatureData } = props;
        this.setState({
            fields:
            {
                txtExtendedText: field({ name: 'txtExtendedText', value: '', isRequired: true, minLength: 3 }),
                vuln_data: field({ name: 'vuln_data', value: signatureData.vuln_data, isRequired: true, minLength: 4 }),
                txtAddParameter: field({ name: 'txtAddParameter', value: '', isRequired: false, pattern: '^([a-zA-Z0-9.!#$%&*+/?^_`{|}~-]+=[A-Z0-9.!#$%&*+/?^_`{|}~-])*$' })
            }
        });
    }

    simpleOrExtendedTextClick = event => {
        if (event.target.value === 'SimpleText') {
            this.setState({
                toggleShowSimpleText: true,
                toggleShowExtendedText: false
            });
            this.props.setLeftAndRightIndexes('0', '0');
        } else {
            this.setState({
                toggleShowSimpleText: false,
                toggleShowExtendedText: true,
            });
            this.props.setLeftAndRightIndexes('-1', '-1');
        }
        this.props.onChangeHandler(event);
    }

    ifVulnIsValidate = () => {
        this.setState({ isAdd: true });
        const vuln_data = document.querySelector('#txtAddDataExtra').value;
        if (this.state.error.length == 0) {
            this.setState({ increment_index: this.state.increment_index + 1 });
            this.props.addToStateArray('vuln_data_extras', { id: `NEW_${this.state.increment_index}`, description: vuln_data })
        }

        const validateVulnDataExtras = this.props.signatureData.vuln_data_extras.length > 0;
        this.setState({ vulnDataExtrasValid: validateVulnDataExtras });
    }

    ifParamterIsValidate = () => {
        const ParamData = document.querySelector('#txtAddParameter').value
        if (ParamData && this.state.error.length == 0) {
            this.props.addToStateArray('parameters', { id: `NEW_${this.state.increment_index}`, parameter: ParamData })
            this.setState({ increment_index: this.state.increment_index + 1 });
        }
    }

    checkReg = () => {
        if (this.state.fields.txtSimpleText.value) {
            this.setState({ matchFound: true })
        } else {
            this.setState({ matchNotFound: true })
        }
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
                        {
                            this.state.toggleShowSimpleText ?
                                <div>
                                    <input
                                        type="text"
                                        className="mt-2 form-control"
                                        name="vuln_data"
                                        value={this.props.signatureData.vuln_data}
                                        onBlur={this.onChange}
                                        onChange={this.props.onChangeHandler}
                                        placeholder="Add text">
                                    </input>
                                    {this.state.fields.vuln_data.errors.map((error, index) => (
                                        <small key={index} className="form-text text-danger">{error}</small>))}
                                </div> : null
                        }
                        <div className="form-check mt-2">
                            <input className="form-check-input" type="checkbox" id="cbToggleshowRegular" disabled={this.props.signatureData.simpleOrExtendedText === 'ExtendedText'} checked={this.props.signatureData.showRegularInStep2} onClick={this.props.toggleshowRegularInStep2} />
                            <label className="form-check-label" for="cbToggleshowRegular">Regular expression</label>
                        </div>
                        {
                            this.props.signatureData.showRegularInStep2 ?
                                <div className="mt-3">
                                    <label>Test text:</label>
                                    <textarea
                                        rows="7"
                                        type="text"
                                        className="form-control"
                                        name="txtTestText"
                                        onChange={this.props.onChangeHandler}
                                        id="testText"
                                        placeholder="Add text">
                                    </textarea>
                                    <div className="mt-2 mb-2">
                                        <button className="btn btn-block btn-secondary" onClick={this.checkReg}>Test</button>
                                    </div>
                                </div> : null
                        }
                    </div>
                    <div className="col-md-6">
                        <input type="radio" name="simpleOrExtendedText" id="rbExtendedText" value="ExtendedText" checked={this.props.signatureData.simpleOrExtendedText === 'ExtendedText'} onBlur={this.onBlur} onClick={this.simpleOrExtendedTextClick} />
                        <label className="form-check-label" for="rbExtendedText">Extended text:</label>
                        <div className="custom-control custom-switch float-right">
                            <input name="keep_order" checked={this.props.signatureData.keep_order} onChange={this.props.onChangeHandler} type="checkbox" className="custom-control-input" id="toggle"></input>
                            <label className="custom-control-label" for="toggle">Keep order</label>
                        </div>
                        {
                            this.state.toggleShowExtendedText ?
                                <div>
                                    <div className="input-group sm-3 mb-2 mt-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="txtExtendedText"
                                            defaultValue={this.state.fields.txtExtendedText.value}
                                            onBlur={this.onChange}
                                            onChange={this.props.onChangeHandler}
                                            id="txtAddDataExtra"
                                            placeholder="Add text">
                                        </input>
                                        <div className="input-group-append">
                                            <button type="button" className="btn btn-secondary" onClick={this.ifVulnIsValidate}>Add</button>
                                        </div>
                                    </div>
                                    {this.state.fields.txtExtendedText.errors.map((error, index) => (
                                        <small key={index} className="form-text text-danger">{error}</small>))}
                                </div> : null
                        }

                        <Table headers={this.extendedTextHeaders} data={this.props.signatureData.vuln_data_extras.map(data => {
                            return ({ Vuln_text: data.description, order: '^v', actions: [<Actions id={data.id} stateName="vuln_data_extras" excludeFromStateArrayById={this.props.excludeFromStateArrayById} />] });
                        })} />
                    </div>
                </div>
                <hr />
                <div className="row ml-3">
                    <div className="col-md-6">
                        <Scanat signatureData={this.props.signatureData} onChangeHandler={this.props.onChangeHandler} disabled={false} />

                        <h6 className="mt-3">Limit scaning to the following headers :</h6>
                        <select className="form-control mb-2" name="limit" value={this.props.signatureData.limit} onChangeHandler={this.props.onChangeHandler} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.scan_header}>
                            <option value="">Choose...</option>
                            <option value="user_agent">User Agent</option>
                            <option value="referer">Referer</option>
                            <option value="range">Range</option>
                            <option value="cookie">Cookie</option>
                            <option value="origin">Origin</option>
                            <option value="last_modified">Last-Modified</option>
                            <option value="keep_alive">Keep-Alive</option>
                            <option value="content_disposition">Content-Disposition</option>
                            <option value="content_encoding">Content-Encoding</option>
                            <option value="content_language">Content-Language</option>
                            <option value="content_length">Content-Length</option>
                            <option value="content_location">Content-Location</option>
                            <option value="content_type">Content-Type</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <div className="input-group sm-3 mb-2" >
                            <input
                                type="text"
                                className="form-control"
                                name="txtAddParameter"
                                id="txtAddParameter"
                                defaultValue={this.state.fields.txtAddParameter.value}
                                onBlur={this.onChange}
                                placeholder="Add parametrs">
                            </input>
                            <div className="input-group-append">
                                <button type="button" className="btn btn-secondary" onClick={this.ifParamterIsValidate}>Add parameter</button>
                            </div>
                        </div>
                        {this.state.fields.txtAddParameter.errors.map((error, index) => (
                            <small key={index} className="form-text text-danger">{error}</small>
                        ))}

                        <Table data={this.props.signatureData.parameters.map(param => {

                            return ({ ['Parameter(=Value)']: param.parameter, actions: [<Actions id={param.id} stateName="parameters" excludeFromStateArrayById={this.props.excludeFromStateArrayById} />] });
                        })} />
                    </div>
                </div>
                <div>
                    <hr />
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="start_break" checked={this.props.signatureData.start_break} onChange={this.props.onChangeHandler}></input> Set Start Break
                                </label>
                        <div className="radio ml-4">
                            <label className="form-check form-check-inline">
                                <input type="radio" id="filename1" name="start_break" value="setStartBreakByFileName" checked={this.props.signatureData.start_break === 'setStartBreakByFileName'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.start_break}></input>
                                <label className="ml-1" for="filename1">By FILENAME (?)</label>
                            </label>
                            <label className="form-check form-check-inline">
                                <input type="radio" id="alpha1" name="start_break" value="setStartBreakByAlpha" checked={this.props.signatureData.start_break === 'setStartBreakByAlpha'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.start_break}></input>
                                <label className="ml-1" for="alpha1">By Alpha (?)</label>
                            </label>
                        </div>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="end_break" checked={this.props.signatureData.end_break} onChange={this.props.onChangeHandler} />Set End Break
                        </label>
                        <div className="radio ml-4">
                            <label className="form-check form-check-inline">
                                <input type="radio" id="filename2" name="end_break" value="setEndBreakByFileName" checked={this.props.signatureData.end_break === 'setEndBreakByFileName'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.end_break}></input>
                                <label className="ml-1" for="filename2">By FILENAME (?)</label>
                            </label>
                            <label className="form-check form-check-inline">
                                <input type="radio" id="alpha2" name="end_break" value="setEndBreakByAlpha" checked={this.props.signatureData.end_break === 'setEndBreakByAlpha'} onChange={this.props.onChangeHandler} disabled={!this.props.signatureData.end_break}></input>
                                <label className="ml-1" for="alpha2">By Alpha (?)</label>
                            </label>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}