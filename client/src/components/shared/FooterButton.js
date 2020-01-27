import React, { Component } from 'react';

class FooterButton extends Component {
    onButtonClick = () => {
        this.props.action && this.props.action(this.props.args);
    }

    render() {
        return (
            <button type="button" className={this.props.bootstrapClass} onClick={this.onButtonClick}>
                {this.props.text}
            </button>
        );
    }
}

export default FooterButton;