import React from "react";



export default class QaStatuseUpdate extends React.Component {
    state = {
        name: this.props.value,
        role:this.props.role,
        checkedOption: this.props.checkedOption

    }
    render() {

        return (<>
        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={`${this.state.name}${this.state.role}`} 
                            id={`${this.state.name}${this.state.role}1`} value="init"   
                        ></input>
                        <label className="form-check-label" htmlFor={`${this.state.name}${this.state.role}1`}>Init</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={`${this.state.name}${this.state.role}`}
                            id={`${this.state.name}${this.state.role}2`} value="passed" ></input>
                        <label className="form-check-label" htmlFor={`${this.state.name}${this.state.role}2`}>Passed</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={`${this.state.name}${this.state.role}`}
                            id={`${this.state.name}${this.state.role}3`} value="failed" ></input>
                        <label className="form-check-label" htmlFor={`${this.state.name}${this.state.role}3`}>Failed</label>
                    </div>
        </>);
    }

}
