import React, { Component } from 'react';

import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import ControlSteps from '../shared/ControlSteps';
import WizardFooterButtons from '../shared/WizardFooterButtons';

import NotificationIsCreated from '../shared/NotificationIsCreated';
import NotificationIsNotCreated from '../shared/NotificationIsNotCreated';

import CreateOrEditSignatureStep1Details from './CreateOrEditSignatureStep1Details';
import CreateOrEditSignatureStep2Volnarability from './CreateOrEditSignatureStep2Volnarability';
import CreateOrEditSignatureStep3Validate from './CreateOrEditSignatureStep3Validate';
import CreateOrEditSignatureStep4ExternalReferences from './CreateOrEditSignatureStep4ExternalReferences';
import CreateOrEditSignatureStep5Attributes from './CreateOrEditSignatureStep5Attributes';
import CreateOrEditSignatureStep6History from './History';
import constants from '../shared/constants';

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
            isCreateSignature: false,
            isErrorSignature: false,
            errors: '',
            ifCancelButton: false,
            currentStep: 0,
            signatureData: {
                userId: 1,
                type: '',
                status: "in_progress",
                vuln_data: "vuln data for this signature is: ",
                showRegularInStep2: false,
                keep_order: false,
                start_break: null,
                end_break: null,
                left_index: '0',
                right_index: '0',
                scan_uri: false,
                scan_header: false,
                scan_body: false,
                scan_parameters: false,
                scan_file_name: false,
                severity: valueBySeverity['medium'],
                description: null,
                test_data: '',
                attackName: null,
                limit: "UserAgent",
                files: [
                    { signatureId: 1, file: "Simple File" },
                    { signatureId: 1, file: "Simple File" }
                ],
                attack: {
                    attack_id: 66979,
                    name: "rgaergergerg"
                },
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
                    { id: '1', description: "this is sample desc", signatureId: 1 },
                    { id: '2', description: "this is sample desc", signatureId: 1 }
                ],
                web_servers: [
                    { id: '1', web: 'Web Server 1' },
                    { id: '2', web: 'Web Server 2' }
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

    componentDidMount = async () => {
        const [attacks] = await Promise.all([constants.getAttacks()]);
        this.setState({ attacks: attacks });
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

    mapStateToApiInput = () => {
        const newId = this.getRandomId(100000);
        const now = new Date().toLocaleString("he-IL").split(', ');

        let vuln_data = '';

        if (this.state.signatureData.simpleOrExtendedText === 'ExtendedText') {
            vuln_data = this.state.signatureData.txtExtendedText
            this.setState({ type: this.state.type = 'vuln_ex' })

        } else if (this.state.signatureData.showRegularInStep2) {
            vuln_data = this.state.signatureData.txtTestText;
            console.log(this.state.signatureData.txtTestText);
            this.setState({ type: this.state.type = 'vuln_reg_ex' })

        } else if (this.state.signatureData.simpleOrExtendedText === 'SimpleText') {
            vuln_data = this.state.signatureData.txtSimpleText;
            this.setState({ type: this.state.type = 'vuln' })
        }

        const createSignatureInput = {
            userId: 1,
            attackId: 4,
            type: this.state.type,
            creation_time: now[1],
            creation_date: now[0],
            status: this.state.signatureData.status,
            in_qa_internal_status_manual: "init",
            in_qa_internal_status_performance: "init",
            in_qa_internal_status_automation: "init",
            vuln_data: vuln_data,
            keep_order: this.state.signatureData.keep_order,
            start_break: this.state.signatureData.start_break,
            end_break: this.state.signatureData.end_break,
            right_index: this.state.signatureData.right_index,
            // left_index: this.state.signatureData.left_index,
            scan_uri: this.state.signatureData.scan_uri,
            scan_header: this.state.signatureData.scan_header,
            scan_body: this.state.signatureData.scan_body,
            scan_parameters: this.state.signatureData.scan_parameters,
            scan_file_name: this.state.signatureData.scan_file_name,
            severity: severityByValue[this.state.signatureData.severity],
            description: this.state.signatureData.description,
            test_data: this.state.signatureData.test_data,
            files: this.state.signatureData.files,
            // limit: this.state.signatureData.limit,
            attack: {
                id: this.getRandomId(100000),
                name: this.state.signatureData.attackName
            },
            parameters: this.state.signatureData.parameters,
            external_references: this.state.signatureData.external_references,
            vuln_data_extras: this.state.signatureData.vuln_data_extras,
            web_servers: this.state.signatureData.web_servers
        };
        return createSignatureInput;
    }

    createSignatureButtonClick = () => {
        try {
            const createSignatureInput = this.mapStateToApiInput();
            const respone = axios.post('http://localhost:3001/signature', createSignatureInput)
            this.setState({ isCreateSignature: true })
            console.log(createSignatureInput);

        } catch (error) {
            this.setState({
                isErrorSignature: true,
                errors: error.message
            });
        }
    }

    async componentDidMount() {
        const sigId = this.props.match.params.id;
        if (sigId) {
            const { data: retrievedSignature } = await axios.get(`http://localhost:3001/signature/${sigId}`);
            const mappedSignature = this.mapApiResultToState(retrievedSignature[0]);
            this.setState({ signatureData: mappedSignature });
        }
    }

    mapApiResultToState = (retrievedSignature) => {
        const mappedSignature = {
            id: retrievedSignature.id,
            user_id: retrievedSignature.user_id,
            pattern_id: retrievedSignature.pattern_id,
            type: retrievedSignature.type,
            status: retrievedSignature.status,
            vuln_data: retrievedSignature.vuln_data,
            showRegularInStep2: retrievedSignature.showRegularInStep2,
            keep_order: retrievedSignature.keep_order,
            start_break: retrievedSignature.start_break,
            end_break: retrievedSignature.end_break,
            //left_index: retrievedSignature.left_index,
            right_index: retrievedSignature.right_index,
            scan_uri: retrievedSignature.scan_uri,
            scan_header: retrievedSignature.scan_header,
            scan_body: retrievedSignature.scan_body,
            scan_parameters: retrievedSignature.scan_parameters,
            scan_file_name: retrievedSignature.scan_file_name,
            //severity: retrievedSignature.severity,
            severity: valueBySeverity[retrievedSignature.severity],
            description: retrievedSignature.description,
            test_data: retrievedSignature.test_data,
            files: retrievedSignature.files,
            attack: {
                id: this.getRandomId(100000),
                name: retrievedSignature.attackName
            },
            parameters: retrievedSignature.parameters,
            external_references: retrievedSignature.external_references,
            vuln_data_extras: retrievedSignature.vuln_data_extras,
            web_servers: retrievedSignature.web_servers
        }
        return mappedSignature;
    }

    createWithDefaultsButtonClick = async () => {
        try {
            const createSignatureInput = this.mapStateToApiInput();
            const response = await axios.post('http://localhost:3001/signature', createSignatureInput);
            this.setState({ isCreateSignature: true });
        } catch (error) {
            this.setState({
                isErrorSignature: true,
                errors: error.message
            })
        }
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
        this.setState({ left_index: this.state.signatureData.left_index = leftIndex })
        this.setState({ right_index: this.state.signatureData.right_index = rightIndex })
    }

    // REMOVE WHEN DISABLING CONTROL STEPS
    setCurrentStep = (currentStep) => {
        this.setState({ currentStep: currentStep });
    }

    isCancelResarcherDashboard = () => {

        // <Redirect to='/researcher-dashboard' />
        //  this.setState({ifCancelButton:true})
        // {this.state.ifCancelButton && <Redirect to='/researcher-dashboard' />}
    }

    updateSignatureButton = () => {
        alert('update button clicked');
    }

    render() {
        const steps = [
            <CreateOrEditSignatureStep1Details signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} onBlur={this.onBlur} signatureErrors={this.state.errors} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} isCancelResarcherDashboard={this.isCancelResarcherDashboard} updateSignatureButton={this.updateSignatureButton} />,
            <CreateOrEditSignatureStep2Volnarability signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} toggleshowRegularInStep2={this.toggleshowRegularInStep2} setLeftAndRightIndexes={this.setLeftAndRightIndexes} isCancelResarcherDashboard={this.isCancelResarcherDashboard} updateSignatureButton={this.updateSignatureButton} />,
            <CreateOrEditSignatureStep3Validate signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} toggleshowRegularInStep2={this.toggleshowRegularInStep2} isCancelResarcherDashboard={this.isCancelResarcherDashboard} updateSignatureButton={this.updateSignatureButton} />,
            <CreateOrEditSignatureStep4ExternalReferences signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} isCancelResarcherDashboard={this.isCancelResarcherDashboard} updateSignatureButton={this.updateSignatureButton} />,
            <CreateOrEditSignatureStep5Attributes signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} isCancelResarcherDashboard={this.isCancelResarcherDashboard} updateSignatureButton={this.updateSignatureButton} />,
            <CreateOrEditSignatureStep6History signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} isCancelResarcherDashboard={this.isCancelResarcherDashboard} updateSignatureButton={this.updateSignatureButton} />
        ];

        if (this.state.isCreateSignature) {
            return (
                <NotificationIsCreated />
            )
        }
        if (this.state.isErrorSignature) {
            return (
                <NotificationIsNotCreated errors={this.state.errors} />
            )
        }

        return (
            <div style={{ margin: '20px' }}>
                <ControlSteps currentStep={this.state.currentStep} setCurrentStep={this.setCurrentStep} isUpdateSignature={this.props.match.params.id} />
                <div style={{ paddingTop: '10px', paddingBottom: '80px' }}>
                    {steps[this.state.currentStep]}
                </div>
                <WizardFooterButtons
                    isFirstStep={this.state.currentStep === 0}
                    isLastStep={this.state.currentStep === steps.length - 2}
                    signatureData={this.state.signatureData}
                    showCreateWithDefaultsButton={stepsIndexesContainingCreateWithDefaultsButton.includes(this.state.currentStep)}
                    onBackClick={this.onBackClick}
                    onNextClick={this.onNextClick}
                    createWithDefaultsButtonClick={this.createWithDefaultsButtonClick}
                    createSignatureButtonClick={this.createSignatureButtonClick}
                    isUpdateSignature={this.props.match.params.id}
                    isCancelResarcherDashboard={this.isCancelResarcherDashboard}
                    updateSignatureButton={this.updateSignatureButton}
                />
            </div>
        );
    }
}

export default withRouter(CreateOrEditSignatureWizard);