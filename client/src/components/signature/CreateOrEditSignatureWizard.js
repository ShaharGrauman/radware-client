import React, { Component } from 'react';

import ControlSteps from '../shared/ControlSteps';
import WizardFooterButtons from '../shared/WizardFooterButtons';

import CreateOrEditSignatureStep1Details from './CreateOrEditSignatureStep1Details';
import CreateOrEditSignatureStep2Volnarability from './CreateOrEditSignatureStep2Volnarability';
import CreateOrEditSignatureStep3Validate from './CreateOrEditSignatureStep3Validate';
import CreateOrEditSignatureStep4ExternalReferences from './CreateOrEditSignatureStep4ExternalReferences';
import CreateOrEditSignatureStep5Attributes from './CreateOrEditSignatureStep5Attributes';

const stepsIndexesContainingCreateWithDefaultsButton = [1, 2, 3];

class CreateOrEditSignatureWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            signatureData: {}
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

    createSignatureButtonClick = () => {
        alert('CREATE SIGNATURE BUTTON CLICKED:' + JSON.stringify(this.state.signatureData));
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