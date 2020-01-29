import React, { Component } from 'react';

import axios from 'axios';

import ControlSteps from '../shared/ControlSteps';
import WizardFooterButtons from '../shared/WizardFooterButtons';

import CreateOrEditSignatureStep1Details from './CreateOrEditSignatureStep1Details';
import CreateOrEditSignatureStep2Volnarability from './CreateOrEditSignatureStep2Volnarability';
import CreateOrEditSignatureStep3Validate from './CreateOrEditSignatureStep3Validate';
import CreateOrEditSignatureStep4ExternalReferences from './CreateOrEditSignatureStep4ExternalReferences';
import CreateOrEditSignatureStep5Attributes from './CreateOrEditSignatureStep5Attributes';

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
            currentStep: 0,
            signatureData: {
                id: 2829, //?
                user_id: 1,
                // attack_id: 1,
                pattern_id: 123452, //?
                type: "vuln",
                // creation_time: "17:04:44",
                // creation_date: "2020-01-15",
                status: "in_progress",
                // in_qa_internal_status_manual: "init",
                // in_qa_internal_status_performance: "init",
                // in_qa_internal_status_automation: "init",
                vuln_data: "vuln data for this signature is: ",
                keep_order: false,
                start_break: null,
                end_break: null,
                right_index: null,
                scan_uri: null,
                scan_header: null,
                scan_body: null,
                scan_parameters: null,
                scan_file_name: null,
                severity: valueBySeverity['medium'],
                description: null,
                test_data: "this is FAKE test_data",
                // attackId: 1,
                userId: 1,
                files: [
                    {
                        signatureId: 1,
                        file: "Simple File"
                    },
                    {
                        signatureId: 1,
                        file: "Simple File"
                    }
                ],
                attackName: null,
                parameters: [
                    {
                        parameter: "this is sample PARAMETERS!",
                        signatureId: 1
                    },
                    {
                        parameter: "this is sample PARAMETERS!",
                        signatureId: 1
                    }
                ],
                external_references: [
                    {
                        type: "cveid",
                        reference: "http://www.security.com/bid/214",
                        signatureId: 1
                    },
                    {
                        type: "bugtraqid",
                        reference: "http://www.BOOS.com/55",
                        signatureId: 1
                    },
                    {
                        type: "bugtraqid",
                        reference: "http://www.cve.com/bid/24",
                        signatureId: 1
                    },
                    {
                        type: "cveid",
                        reference: "http://www.security.com/",
                        signatureId: 1
                    }
                ],
                vuln_data_extras: [
                    {
                        description: "this is sample desc",
                        signatureId: 1
                    },
                    {
                        description: "this is sample desc",
                        signatureId: 1
                    }
                ],
                web_servers: [
                    { id: '1', webserver: 'Web Server 1' },
                    { id: '2', webserver: 'Web Server 2' },
                    { id: '3', webserver: 'Web Server 3' },
                    { id: '4', webserver: 'Web Server 4' },
                    { id: '5', webserver: 'Web Server 5' },
                ],
                signature_status_histories: [
                    {
                        status: "in_progress",
                        time: "17:12:12",
                        date: "2020-01-15",
                        signatureId: 1,
                        userId: 1
                    },
                    {
                        status: "in_progress",
                        time: "17:12:19",
                        date: "2020-01-15",
                        signatureId: 1,
                        userId: 1
                    },
                    {
                        status: "in_progress",
                        time: "17:12:28",
                        date: "2020-01-15",
                        signatureId: 1,
                        userId: 1
                    },
                    {
                        status: "in_progress",
                        time: "17:12:33",
                        date: "2020-01-15",
                        signatureId: 1,
                        userId: 1
                    }
                ]
            }
        };
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

    getRandomId = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    createSignatureButtonClick = () => {
        const newId = this.getRandomId(100000);
        const now = new Date().toLocaleString("he-IL").split(', ');
        console.log();
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
                name: "attack1"
            },
            parameters: [
                { id: 5285838, parameter: "this is sample PARAMETERS!", signatureId: newId }
            ],
            external_references: [
                { id: 4578935, type: "cveid", reference: "http://www.security.com/bid/214", signatureId: newId }
            ],
            vuln_data_extras: [
                { id: 455535, description: "this is sample desc", signatureId: newId }
            ],
            web_servers: []
        };
        axios.post('http://localhost:3001/signature', createSignatureInput);
    }

    createWithDefaultsButtonClick = () => {
        alert(`CREATE WITH DEFAULTS BUTTON CLICKED!`);
    }

    // REMOVE WHEN DISABLING CONTROL STEPS
    setCurrentStep = (currentStep) => {
        this.setState({ currentStep: currentStep });
    }

    render() {
        const steps = [
            <CreateOrEditSignatureStep1Details signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} />,
            <CreateOrEditSignatureStep2Volnarability signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} />,
            <CreateOrEditSignatureStep3Validate signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} />,
            <CreateOrEditSignatureStep4ExternalReferences signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} />,
            <CreateOrEditSignatureStep5Attributes signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} />
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