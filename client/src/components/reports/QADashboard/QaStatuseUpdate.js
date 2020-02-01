import React from "react";

export default class QaStatuseUpdate extends React.Component {
    state = {
        signature:this.props.signature,
        name: this.props.signature.seq_id,
        role:this.props.role,
        val:this.props.signature[this.props.role]
    }

    render() {
        return (<>
        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={`${this.state.name}${this.state.role}`} 
                            id={`${this.state.name}${this.state.role}1`} value="init" checked={this.state.signature[this.state.role]==='init'} 
                            onClick={()=>{
                                this.state.signature[this.state.role]='init';
                                this.setState({});                                
                            }}
                        ></input>
                        <label className="form-check-label" htmlFor={`${this.state.name}${this.state.role}1`}>Init</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={`${this.state.name}${this.state.role}`}
                            id={`${this.state.name}${this.state.role}2`} value="passed"  checked={this.state.signature[this.state.role]==='passed'}
                            onClick={()=>{
                                this.state.signature[this.state.role]='passed';
                                this.setState({});                                
                            }}
                            ></input>
                        <label className="form-check-label" htmlFor={`${this.state.name}${this.state.role}2`}>Passed</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={`${this.state.name}${this.state.role}`}
                            id={`${this.state.name}${this.state.role}3`} value="failed" checked={this.state.signature[this.state.role]==='failed'}
                            onClick={()=>{
                                this.state.signature[this.state.role]='failed';
                                this.setState({});                                
                            }}
                            ></input>
                        <label className="form-check-label" htmlFor={`${this.state.name}${this.state.role}3`}>Failed</label>
                    </div>
        </>);
    }

}
