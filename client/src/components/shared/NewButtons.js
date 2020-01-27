import React, { Component } from 'react';

export default class NewButtons extends Component {
    render() {
        return (
            <div className="row ml-2">
                <div className="col-md-4 mb-4 col-sm-3 col-3">
                    <button className="btn btn-secondary ml-4 mt-4">previous</button>
                </div>
                <div class="col-md-4 col-sm-3 mb-4 col-2">
                    <button class="btn btn-secondary ml-4 mt-4">Next</button>
                </div>
                <div class="col-md-4 col-sm-3 mb-4 mt-4 col-7">
                    <button class="btn btn-secondary">Create signature with defualts</button>
                </div>
            </div>
        );
    }
}