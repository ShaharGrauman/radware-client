import React, { Component } from 'react';
import Steps, { Step } from 'rc-steps';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

class ControlSteps extends Component {
    render() {
        if (this.props.isUpdateSignature) {
            return (
                <div>
                    <Steps current={this.props.currentStep} onChange={val => { this.props.setCurrentStep(val) }} >
                        <Step title="Details" />
                        <Step title="Volnarability" />
                        <Step title="Validate" />
                        <Step title="External References" />
                        <Step title="Attributes" />
                        <Step title="History" />
                        <Step title="Analysis" />
                    </Steps>
                </div>
            );
        }

        return (
            <div>
                <Steps current={this.props.currentStep} onChange={val => { this.props.setCurrentStep(val) }} >
                    <Step title="Details" />
                    <Step title="Volnarability" />
                    <Step title="Validate" />
                    <Step title="External References" />
                    <Step title="Attributes" />
                </Steps>
            </div>
        );
    }
}

export default ControlSteps;