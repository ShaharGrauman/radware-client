import React, { Component } from 'react';
import FooterButton from './FooterButton';

class WizardFooterButtons extends Component {
    render() {
        if(this.props.isUpdateSignature){
            return (
                <div style={{ zIndex : 10, width: '100%', boxShadow: 'inset 0px 1px 3px 0px rgba(20,20,20,1)', backgroundColor: '#007BFF', paddingTop: '20px', paddingBottom: '20px', margin: '0px', position: 'fixed', left: '0px', bottom: '0px' }}>
                    <FooterButton action={this.props.isCancelResarcherDashboard} args={{}} text="CANCEL" bootstrapClass="btn btn-dark ml-2"></FooterButton>
                    <FooterButton action={this.props.updateSignatureButton} args={{}} text="UPDATE SIGNATURE" bootstrapClass="btn btn-danger ml-2"></FooterButton>
                </div>
            );
        }
        return (
            <div style={{ zIndex: 10, width: '100%', boxShadow: 'inset 0px 1px 3px 0px rgba(20,20,20,1)', backgroundColor: '#007BFF', paddingTop: '20px', paddingBottom: '20px', margin: '0px', position: 'fixed', left: '0px', bottom: '0px'}}>
                {!this.props.isFirstStep && <FooterButton action={this.props.onBackClick} args={{}} text="BACK" bootstrapClass="btn btn-light ml-2"></FooterButton>}
                {!this.props.isLastStep && <FooterButton action={this.props.onNextClick} args={{}} text="NEXT" bootstrapClass="btn btn-dark ml-2"></FooterButton>}
                {this.props.isLastStep && <FooterButton action={this.props.createSignatureButtonClick} args={this.props.signatureData} text="CREATE SIGNATURE" bootstrapClass="btn btn-success ml-2"></FooterButton>}
                {this.props.showCreateWithDefaultsButton && <FooterButton action={this.props.createWithDefaultsButtonClick} args={this.props.signatureData} text="CREATE WITH DEFAULTS" bootstrapClass="btn btn-outline-light ml-2"></FooterButton>}
            </div>
        );
    }
}

export default WizardFooterButtons;