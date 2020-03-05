import React from "react";

export default class QaStatuseUpdate extends React.Component {
    state = {
        signature: this.props.signature,
        name: this.props.signature.id,
        role: this.props.role,
        val: this.props.signature[this.props.role]
    }

    render() {
        return (<>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={`${this.props.signature.id}${this.state.role}`}
                    id={`${this.props.signature.id}${this.state.role}1`} value="init" checked={this.props.signature[this.state.role] === 'init'}
                    onClick={() => {
                        this.props.signature[this.state.role] = 'init';
                        this.setState({});
                    }}
                ></input>
                <label className="form-check-label" htmlFor={`${this.props.signature.id}${this.state.role}1`}>Init</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={`${this.props.signature.id}${this.state.role}`}
                    id={`${this.props.signature.id}${this.state.role}2`} value="passed" checked={this.props.signature[this.state.role] === 'passed'}
                    onClick={() => {
                        this.props.signature[this.state.role] = 'passed';
                        this.setState({});
                    }}
                ></input>
                <label className="form-check-label" htmlFor={`${this.props.signature.id}${this.state.role}2`}>Passed</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={`${this.props.signature.id}${this.state.role}`}
                    id={`${this.props.signature.id}${this.state.role}3`} value="failed" checked={this.props.signature[this.state.role] === 'failed'}
                    onClick={() => {
                        this.props.signature[this.state.role] = 'failed';
                        this.setState({});
                    }}
                ></input>
                <label className="form-check-label" htmlFor={`${this.props.signature.id}${this.state.role}3`}>Failed</label>
            </div>
        </>);
    }
}
