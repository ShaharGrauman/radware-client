import React from 'react';

export default class Description extends React.Component {
    render() {
        return (
            <div className="col-lg-11 ml-4 col-md-11 col-sm-10 col-xs-8" style={{ marginTop: 40 }}>
                <h5>Description:</h5>
                <div className="form-group shadow-textarea">
                    <textarea rows="20"
                        name="description"
                        value={this.props.description}
                        onChange={this.props.onChangeHandler}
                        className="form-control z-depth-1"
                        rows="5"
                        style={{ resize: "none" }}
                        placeholder="Write something here...">
                        </textarea>
                </div>
            </div>
        );
    }
}