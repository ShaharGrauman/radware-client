import React, { Component } from 'react';
import { getSignature, createSignatureWithDefaults, updateSignature, createSignature } from '../../api/controllers/signature';
import { withRouter } from 'react-router-dom';
import ControlSteps from '../shared/ControlSteps';
import WizardFooterButtons from '../shared/WizardFooterButtons';
import NotificationIsCreated from './NotificationIsCreated';

import CreateOrEditSignatureStep1Details from './CreateOrEditSignatureStep1Details';
import CreateOrEditSignatureStep2Volnarability from './CreateOrEditSignatureStep2Volnarability';
import CreateOrEditSignatureStep3Validate from './CreateOrEditSignatureStep3Validate';
import CreateOrEditSignatureStep4ExternalReferences from './CreateOrEditSignatureStep4ExternalReferences';
import CreateOrEditSignatureStep5Attributes from './CreateOrEditSignatureStep5Attributes';
import CreateOrEditSignatureStep6History from './History';
import CreateOrEditSignatureStep7Analytics from './SignatureLifeCycleAnalytics';
import Modal from './Modal/Modal.js'
import Backdrop from './Backdrop/Backdrop.js';

const stepsIndexesContainingCreateWithDefaultsButton = [2, 3];

const valueBySeverity = {
    'Low': 0,
    'Medium': 50,
    'High': 100
};

const severityByValue = {
    0: 'Low',
    50: 'Medium',
    100: 'High'
};

class CreateOrEditSignatureWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            isCreateSignature: false,
            isErrorSignature: false,
            isUpdatSignature: false,
            ifValidUpdate: false,
            errors: '',
            ifCancelButton: false,
            currentStep: 0,
            signatureData: {
                status: '',
                vuln_data: '',
                showRegularInStep2: false,
                keep_order: false,
                start_break: null,
                end_break: null,
                left_index: '0',
                right_index: '0',
                scan_uri: true,
                scan_header: false,
                scan_body: false,
                scan_parameters: false,
                scan_file_name: false,
                severity: valueBySeverity['medium'],
                description: '',
                test_data: '',
                attackName: null,
                limit: '',
                attack_id: 0,
                parameters: [],
                external_references: [],
                vuln_data_extras: [],
                web_servers: [],
                signature_status_histories: [],
                simpleOrExtendedText: 'SimpleText'
            }
        };

        this.step1ref = React.createRef();
        this.step2ref = React.createRef();
        this.step3ref = React.createRef();
        this.step4ref = React.createRef();
    }

    showModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onChangeHandler = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const unsavedData = { ...this.state.signatureData, [target.name]: value };
        this.setState({ signatureData: unsavedData });
    }

    onNextClick = async () => {
        switch (this.state.currentStep) {
            case 0:
                if (this.step1ref.current.isAllValid()) {
                    this.setState({ currentStep: this.state.currentStep + 1 });
                }
                break;
            case 1:
                if (await this.step2ref.current.isAllValid()) {
                    this.setState({ currentStep: this.state.currentStep + 1 });
                }
                break;
            case 2:
                if (await this.step3ref.current.isAllValid()) {
                    this.setState({ currentStep: this.state.currentStep + 1 });
                }
                break;
            case 3:
                if (await this.step4ref.current.isAllValid()) {
                    this.setState({ currentStep: this.state.currentStep + 1 });
                }
                break;
            default:
                this.setState({ currentStep: this.state.currentStep + 1 });
                break;
        }
    }

    setIsValidStep = isValidStep => {
        this.setState({ isValidStep: isValidStep });
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
        if (stateName && data) {
            this.state.signatureData[stateName].push(data);
        }
    }

    mapStateToApiInput = () => {
        let vuln_data = '', type = '', signature = this.state.signatureData;

        if (signature.simpleOrExtendedText === 'ExtendedText') type = 'vuln_ex';
        if (signature.showRegularInStep2) type = 'vuln_reg_ex';
        if (signature.simpleOrExtendedText === 'SimpleText') {
            type = 'vuln';
            vuln_data = this.state.signatureData.txtSimpleText;
        }

        this.setState({ type: type });

        const createSignatureInput = {
            type: type,
            status: this.state.signatureData.status,
            vuln_data: this.state.signatureData.vuln_data,
            keep_order: this.state.signatureData.keep_order,
            start_break: this.state.signatureData.start_break || '',
            end_break: this.state.signatureData.end_break || '',
            right_index: this.state.signatureData.right_index,
            left_index: this.state.signatureData.left_index,
            scan_uri: this.state.signatureData.scan_uri,
            scan_header: this.state.signatureData.scan_header,
            scan_body: this.state.signatureData.scan_body,
            scan_parameters: this.state.signatureData.scan_parameters,
            scan_file_name: this.state.signatureData.scan_file_name,
            severity: severityByValue[this.state.signatureData.severity],
            description: this.state.signatureData.description,
            test_data: this.state.signatureData.test_data,
            files: this.state.signatureData.files,
            limit: this.state.signatureData.limit,
            attack_id: this.state.signatureData.attack_id,
            parameters: this.state.signatureData.parameters,
            external_references: this.state.signatureData.external_references,
            vuln_data_extras: this.state.signatureData.vuln_data_extras,
            web_servers: this.state.signatureData.web_servers,
            signature_status_histories: this.state.signature_status_histories
        };

        return createSignatureInput;
    }

    createSignatureButtonClick = async () => {
        try {
            const createSignatureInput = this.mapStateToApiInput();
            await createSignature(createSignatureInput)
            this.setState({ isCreateSignature: true })

        } catch (error) {
            this.setState({
                isErrorSignature: true,
                errors: error
            });
        }
    }

    componentDidMount = async () => {
        try {
            const sigId = this.props.match.params.id;
            if (sigId) {
                const retrievedSignature = await getSignature(sigId);
                const mappedSignature = this.mapApiResultToState(retrievedSignature[0]);
                this.setState({ signatureData: mappedSignature });
            }
        } catch (error) {
            throw error;
        }
    }

    mapApiResultToState = retrievedSignature => {
        const mappedSignature = {
            type: retrievedSignature.type,
            creation_time: retrievedSignature.creation_time,
            creation_date: retrievedSignature.creation_date,
            status: retrievedSignature.status,
            vuln_data: retrievedSignature.vuln_data,
            showRegularInStep2: retrievedSignature.showRegularInStep2,
            keep_order: retrievedSignature.keep_order,
            start_break: retrievedSignature.start_break,
            end_break: retrievedSignature.end_break,
            left_index: retrievedSignature.left_index,
            right_index: retrievedSignature.right_index,
            scan_uri: retrievedSignature.scan_uri,
            scan_header: retrievedSignature.scan_header,
            scan_body: retrievedSignature.scan_body,
            scan_parameters: retrievedSignature.scan_parameters,
            scan_file_name: retrievedSignature.scan_file_name,
            severity: valueBySeverity[retrievedSignature.severity],
            description: retrievedSignature.description,
            limit: retrievedSignature.limit,
            test_data: retrievedSignature.test_data,
            files: retrievedSignature.files,
            attack_id: retrievedSignature.attack_id,
            parameters: retrievedSignature.parameters || [],
            external_references: retrievedSignature.external_references || [],
            vuln_data_extras: retrievedSignature.vuln_data_extras || [],
            web_servers: retrievedSignature.web_servers || [],
            signature_status_histories: retrievedSignature.signature_status_histories || [],
        }
        mappedSignature.simpleOrExtendedText = mappedSignature.type === 'vuln' ? 'SimpleText' : 'ExtendedText';
        mappedSignature.txtSimpleText = mappedSignature.vuln_data;
        return mappedSignature;
    }

    createWithDefaultsButtonClick = async () => {
        try {
            const createSignatureInput = this.mapStateToApiInput();
            await createSignatureWithDefaults(createSignatureInput);
            this.setState({ isCreateSignature: true });
        } catch (error) {
            this.setState({
                isErrorSignature: true,
                errors: error
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

    setCurrentStep = currentStep => {
        this.setState({ currentStep: currentStep });
    }

    clickYesUpdated = () => {
        this.setState({ ifValidUpdate: true });
        this.updateSignatureButton()
    }

    updateSignatureButton = async () => {
        try {
            const createSignatureInput = this.mapStateToApiInput(this.state.signatureData);
            await updateSignature(this.props.match.params.id, createSignatureInput);
            this.setState({ isUpdatSignature: true })
        } catch (error) {
            this.setState({
                isErrorSignature: true,
                errors: error
            });
        }
    }

    render() {
        const steps = [
            <CreateOrEditSignatureStep1Details ref={this.step1ref} attacks={this.state.attacks} signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} onBlur={this.onBlur} signatureErrors={this.state.errors} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} />,
            <CreateOrEditSignatureStep2Volnarability ref={this.step2ref} signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} toggleshowRegularInStep2={this.toggleshowRegularInStep2} setLeftAndRightIndexes={this.setLeftAndRightIndexes} showModal={this.showModal} />,
            <CreateOrEditSignatureStep3Validate ref={this.step3ref} signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} toggleshowRegularInStep2={this.toggleshowRegularInStep2} showModal={this.showModal} />,
            <CreateOrEditSignatureStep4ExternalReferences ref={this.step4ref} signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} showModal={this.showModal} />,
            <CreateOrEditSignatureStep5Attributes signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} showModal={this.showModal} />,
            <CreateOrEditSignatureStep6History signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} showModal={this.showModal} />,
            <CreateOrEditSignatureStep7Analytics signatureData={this.state.signatureData} onChangeHandler={this.onChangeHandler} addToStateArray={this.addToStateArray} excludeFromStateArrayById={this.excludeFromStateArrayById} />
        ];

        if (this.state.isCreateSignature || this.state.isUpdatSignature || this.state.isErrorSignature) {
            return (<NotificationIsCreated isCreateSignature={this.state.isCreateSignature}
                isUpdatSignature={this.state.isUpdatSignature}
                errors={this.state.errors}
                isErrorSignature={this.state.isErrorSignature} />);
        }

        if (this.state.modalIsOpen) {
            return (
                <div>
                    <Modal show={this.state.modalIsOpen} closed={this.closeModal} clickYesUpdated={this.clickYesUpdated} />
                    <Backdrop show={this.state.modalIsOpen} />
                </div>
            );
        }

        return (
            <div key={this.state.newSignature} style={{ margin: '20px' }}>
                <ControlSteps currentStep={this.state.currentStep} setCurrentStep={this.setCurrentStep} isUpdateSignature={this.props.match.params.id} />
                <div style={{ paddingTop: '10px', paddingBottom: '80px' }}>
                    {steps[this.state.currentStep]}
                </div>
                <WizardFooterButtons
                    isFirstStep={this.state.currentStep === 0}
                    isLastStep={this.state.currentStep === steps.length - 3}
                    signatureData={this.state.signatureData}
                    showCreateWithDefaultsButton={stepsIndexesContainingCreateWithDefaultsButton.includes(this.state.currentStep)}
                    onBackClick={this.onBackClick}
                    onNextClick={this.onNextClick}
                    createWithDefaultsButtonClick={this.createWithDefaultsButtonClick}
                    createSignatureButtonClick={this.createSignatureButtonClick}
                    isUpdateSignature={this.props.match.params.id}
                    showModal={this.showModal}
                />
            </div>
        );
    }
}

export default withRouter(CreateOrEditSignatureWizard);