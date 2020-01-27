import React, { Component } from 'react';
import Steps, { Step } from 'rc-steps';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';

class ControlSteps extends Component {
    render() {
        return (
            <div>
                <Steps current={this.props.currentStep} onChange={val => { this.props.setCurrentStep(val) }} >
                    <Step title="Step 1" subTitle="Details" description="Description for Details" />
                    <Step title="Step 2" subTitle="Volnarability" description="Description for Volnarability" />
                    <Step title="Step 3" subTitle="Validate" description="Description for Validate" />
                    <Step title="Step 4" subTitle="External References" description="Description for External References" />
                    <Step title="Step 5" subTitle="Attributes" description="Description for Attributes" />
                </Steps>
            </div>
        );
    }
}

export default ControlSteps;