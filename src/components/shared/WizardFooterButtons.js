import React, { Component } from 'react';
import FooterButton from './FooterButton';
import { Link } from 'react-router-dom';

class WizardFooterButtons extends Component {
    render() {
        return (
            <div style={{ zIndex: 10, width: '100%', boxShadow: 'inset 0px 1px 3px 0px rgba(20,20,20,1)', backgroundColor: '#007BFF', paddingTop: '20px', paddingBottom: '20px', margin: '0px', position: 'fixed', left: '0px', bottom: '0px'}}>
                {/* {<FooterButton action={this.props.isCancelResarcherDashboard} args={{}} text="CANCEL" bootstrapClass="btn btn-outline-light ml-2"></FooterButton>} */}
                <Link to='/researcher-dashboard' style={{color: 'white', textDecoration: 'none'}} className='ml-2'>CANCEL</Link>
                {!this.props.isFirstStep && <FooterButton action={this.props.onBackClick} args={{}} text="BACK" bootstrapClass="btn btn-light ml-2"></FooterButton>}
                {(!this.props.isLastStep || this.props.isUpdateSignature) && <FooterButton action={this.props.onNextClick} args={{}} text="NEXT" bootstrapClass="btn btn-dark ml-2"></FooterButton>}
                {(this.props.isLastStep && this.props.isUpdateSignature) && <FooterButton action={this.props.showModal} args={{}} text="UPDATE SIGNATURE" bootstrapClass="btn btn-danger ml-2"></FooterButton>}
                {(this.props.isLastStep && !this.props.isUpdateSignature) && <FooterButton action={this.props.createSignatureButtonClick} args={this.props.signatureData} text="CREATE SIGNATURE" bootstrapClass="btn btn-success ml-2"></FooterButton>}
                {(this.props.showCreateWithDefaultsButton && !this.props.isUpdateSignature) && <FooterButton action={this.props.createWithDefaultsButtonClick} args={this.props.signatureData} text="CREATE WITH DEFAULTS" bootstrapClass="btn btn-danger ml-2"></FooterButton>}
            </div>
        );
    }
}

export default WizardFooterButtons;