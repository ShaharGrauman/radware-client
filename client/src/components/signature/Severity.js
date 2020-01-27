import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { faMeh } from '@fortawesome/free-solid-svg-icons';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

export default class Severity extends React.Component {
    render() {
        const icons = [faSmile, faMeh, faFrown]
        return (
            <div className="col-lg-5 col-md-5 col-sm-10 col-xs-8" style={{ marginTop: 50 }}>
                <div>
                    <h5>Severity:</h5>
                    <input name="severity" value={this.props.severity} onChange={this.props.onChangeHandler} type="range" min='0' max="100" defaultValue="50" step="50" className="custom-range" style={{ marginTop: 15 }}></input>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                        {
                            icons.map((icon, index) => {
                                return (
                                    <FontAwesomeIcon icon={icon} size={'lg'} color={'darkgray'} key={index} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>)
    }
}