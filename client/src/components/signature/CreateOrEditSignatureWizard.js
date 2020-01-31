import React, { Component } from 'react';

import axios from 'axios';

import ControlSteps from '../shared/ControlSteps';
import WizardFooterButtons from '../shared/WizardFooterButtons';

import CreateOrEditSignatureStep1Details from './CreateOrEditSignatureStep1Details';
import CreateOrEditSignatureStep2Volnarability from './CreateOrEditSignatureStep2Volnarability';
import CreateOrEditSignatureStep3Validate from './CreateOrEditSignatureStep3Validate';
import CreateOrEditSignatureStep4ExternalReferences from './CreateOrEditSignatureStep4ExternalReferences';
import CreateOrEditSignatureStep5Attributes from './CreateOrEditSignatureStep5Attributes';

import { validateStep1 } from '../shared/validations/signature';
const stepsIndexesContainingCreateWithDefaultsButton = [1, 2, 3];

const valueBySeverity = {
    'low': 0,
    'medium': 50,
    'high': 100
};

const severityByValue = {
    0: 'low',
    50: 'medium',
    100: 'high'
};

class CreateOrEditSignatureWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                attackName: []
            },
            currentStep: 0,
            signatureData: {
                id: 2829, //?
                user_id: 1,
                // attack_id: 1,
                pattern_id: 123452, //?
                type: "vuln",
                status: "in_progress",
                vuln_data: "vuln data for this signature is: ",
                showRegularInStep2: false,
                keep_order: false,
                start_break: null,
                end_break: null,
                left_index: 0,
                right_index: 0,
                scan_uri: null,
                scan_header: null,
                scan_body: null,
                scan_parameters: null,
                scan_file_name: null,
                severity: valueBySeverity['medium'],
                description: null,
                test_data: "this is FAKE test_data",
                // attackId: 1,
                attackName: null,
                userId: 1,
                files: [
                    { signatureId: 1, file: "Simple File" },
                    { signatureId: 1, file: "Simple File" }
                ],
                parameters: [
                    { id: '1', parameter: "this is sample PARAMETERS!", signatureId: 1 },
                    { id: '2', parameter: "this is sample PARAMETERS!", signatureId: 1 },
                    { id: '3', parameter: "this is sample PARAMETERS!", signatureId: 1 }
                ],
                external_references: [
                    { id: '1', type: "cveid", reference: "http://www.security.com/bid/214", signatureId: 1 },
                    { id: '2', type: "bugtraqid", reference: "http://www.BOOS.com/55", signatureId: 1 },
                    { id: '3', type: "bugtraqid", reference: "http://www.cve.com/bid/24", signatureId: 1 },
                    { id: '4', type: "cveid", reference: "http://www.security.com/", signatureId: 1 }
                ],
                vuln_data_extras: [
                    { description: "this is sample desc", signatureId: 1 },
                    { description: "this is sample desc", signatureId: 1 }
                ],
                web_servers: [
                    { id: '1', webserver: 'Web Server 1' },
                    { id: '2', webserver: 'Web Server 2' }
                ],
                signature_status_histories: [
                    { status: "in_progress", time: "17:12:12", date: "2020-01-15", signatureId: 1, userId: 1 },
                    { status: "in_progress", time: "17:12:19", date: "2020-01-15", signatureId: 1, userId: 1 },
                    { status: "in_progress", time: "17:12:28", date: "2020-01-15", signatureId: 1, userId: 1 },
                    { status: "in_progress", time: "17:12:33", date: "2020-01-15", signatureId: 1, userId: 1 }
                ]
            }
        };
    }

    onBlur = ({ target: { name, value } }) => {
        const errors = validateStep1({ [name]: value });
        this.setState({
            errors: {
                ...this.state.errors,
                [name]: errors
            }
        });
    }

    onChangeHandler = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const unsavedData = { ...this.state.signatureData, [target.name]: value };
        this.setState({ signatureData: unsavedData });
    }

    onNextClick = () => {
        this.setState({ currentStep: this.state.currentStep + 1 });
    }

    onBackClick = () => {
        this.setState({ currentStep: this.state.currentStep - 1 });
    }

    getRandomId = max => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    excludeFromStateArrayById = (stateName, id) => {
        let filteredArray = this.state.signatureData[stateName].filter(item => item.id !== id);
        this.setState({
            signatureData: {
                ...this.state.signatureData,
                [stateName]: filteredArray
            }
        });
    }

    addToStateArray = (stateName, data) => {
        this.state.signatureData[stateName].push(data);
    }

    createSignatureButtonClick = () => {
        const newId = this.getRandomId(100000);
        const now = new Date().toLocaleString("he-IL").split(', ');
        const createSignatureInput = {
            id: newId,
            user_id: 1,
            attack_id: 1,
            pattern_id: newId,
            type: "vuln",
            creation_time: now[1],
            creation_date: now[0],
            status: this.state.signatureData.status,
            in_qa_internal_status_manual: "init",
            in_qa_internal_status_performance: "init",
            in_qa_internal_status_automation: "init",
            vuln_data: "vuln data for this signature is: ",
            keep_order: this.state.signatureData.keep_order,
            start_break: this.state.signatureData.start_break,
            end_break: this.state.signatureData.end_break,
            simple_text: this.state.signatureData.simple_text,
            right_index: null,
            scan_uri: null,
            scan_header: null,
            scan_body: null,
            scan_parameters: null,
            scan_file_name: null,
            severity: severityByValue[this.state.signatureData.severity],
            description: this.state.signatureData.description,
            test_data: "this is FAKE test_data",
            files: [
                { id: 333333, signatureId: newId, file: "Simple File" }
            ],
            attack: {
                id: 5266354,
                name: this.state.signatureData.attackName
            },
            parameters: [
                { id: 5285838, parameter: "this is sample PARAMETERS!", signatureId: newId }
            ],
            external_references: [
                { id: 4578935, reference: "http://www.security.com/bid/214", type: "cveid", signatureId: newId }
            ],
            vuln_data_extras: [
                { id: 455535, description: "this is sample desc", signatureId: newId }
            ],
            web_servers: this.state.signatureData.web_servers
        };
        axios.post('http://localhost:3001/signature', createSignatureInput);
    }

    createWithDefaultsButtonClick = () => {
        alert(`CREATE WITH DEFAULTS BUTTON CLICKED!`);
    }

    toggleshowRegularInStep2 = () => {
        this.setState({
            signatureData: {
                ...this.state.signatureData,
                showRegularInStep2: !this.state.signatureData.showRegularInStep2
            }
        });
    }

    setLeftAndRightIndexes = (leftIndex, rightIndex) => {
        this.setState({
            signatureData: {
                ...this.state.signatureData,
                left_index: 2,
                right_index: 2
            }
        });
    }

    // REMOVE WHEN DISABLING CONTROL STEPS
    setCurrentStep = (currentStep) => {
        this.setState({ currentStep: currentStep });
    }

    render() {
        const steps = [
            <CreateOrEditSignatureStep1Details signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} onBlur={this.onBlur} signatureErrors={this.state.errors} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} />,
            <CreateOrEditSignatureStep2Volnarability signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} toggleshowRegularInStep2={this.toggleshowRegularInStep2} setLeftAndRightIndexes={this.setLeftAndRightIndexes} />,
            <CreateOrEditSignatureStep3Validate signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} />,
            <CreateOrEditSignatureStep4ExternalReferences signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} />,
            <CreateOrEditSignatureStep5Attributes signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} />
        ];

        return (
            <div style={{ margin: '20px' }}>
                <ControlSteps currentStep={this.state.currentStep} setCurrentStep={this.setCurrentStep} />
                <div style={{ paddingBottom: '100px' }}>
                    {steps[this.state.currentStep]}
                </div>
                <WizardFooterButtons
                    isFirstStep={this.state.currentStep === 0}
                    isLastStep={this.state.currentStep === steps.length - 1}
                    signatureData={this.state.signatureData}
                    showCreateWithDefaultsButton={stepsIndexesContainingCreateWithDefaultsButton.includes(this.state.currentStep)}
                    onBackClick={this.onBackClick}
                    onNextClick={this.onNextClick}
                    createWithDefaultsButtonClick={this.createWithDefaultsButtonClick}
                    createSignatureButtonClick={this.createSignatureButtonClick}
                />
            </div>
        );
    }
}

export default CreateOrEditSignatureWizard;