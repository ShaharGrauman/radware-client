import React from "react";
import MyTable from '../shared/MyTable';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { getAudit } from '../../api/controllers/admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
export default class Audit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audit: [],
            event: '',
            users_names: '',
            orderby: '',
            page: 1,
            size: 20,
            startdate: '',
            enddate: '',
            starttime: '',
            endtime: '',
            hasNext: false,
            hasPrev: false,
            noResult: false,
        }
    }
    tableHeaders = [{ key: "username", value: "Username", toSort: false, sortOrder: true },
    { key: "action_name", value: "Event", toSort: true, sortOrder: false },
    { key: "description", value: "Description", toSort: false, sortOrder: true },
    { key: "lastupdated", value: "Last Updated", toSort: false, sortOrder: true }
    ];

    submitHandler = async e => {
        const result = await getAudit(this.state.event, this.state.users_names, this.state.orderby, this.state.page, this.state.size, this.state.startdate, this.state.enddate, this.state.starttime, this.state.endtime);
        if (result.history.length < 1) this.setState({
            noResult: true,
            audit: [],
            hasNext: false,
            hasPrev: false
        });
        else {
            const audit = [];
            result.history.forEach(element => {
                let username = element.username;
                if (element.history_users_actions.length > 0) {
                    element.history_users_actions.map(data => audit.push({
                        username: username,
                        action_name: data.action_name,
                        description: data.description,
                        lastupdated: data.date + "   " + data.time
                    }))
                }
            });
            this.setState({
                audit: audit,
                hasNext: result.hasNext,
                hasPrev: result.hasPrev,
                noResult: false
            });
        }
    }
    onChangeHandler = (event, toChange) => {
        const target = event.target.value;
        switch (toChange) {
            case "user":
                let user_name = target.replace(/\s+/g, '');
                this.setState({ users_names: user_name });
                break;
            case "startdate": this.setState({ startdate: target }); break;
            case "enddate": this.setState({ enddate: target }); break;
            case "starttime": this.setState({ starttime: target }); break;
            case "endtime": this.setState({ endtime: target }); break;
        }
    }

    handleSelect = target => {
        this.setState({event: target});
    }

    render() {

        return (
            <>
                <div className="">
                    <div className="container mt-5">
                        <div className="row mb-2">
                            <h1>Audit Search</h1>
                        </div>

                        <label htmlFor="basic-url"><h5>Start date</h5></label>
                        <div className="row">
                        </div>
                        <div className="row">


                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">From</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="startDate"
                                        className="form-control"
                                        placeholder="YYYY-MM-DD"
                                        aria-describedby="basic-addon3"
                                        onChange={event => this.onChangeHandler(event, "startdate")}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Hour</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="HH:MM:SS"
                                        aria-describedby="basic-addon3"
                                        onChange={event => this.onChangeHandler(event, "starttime")}
                                    />
                                </div>
                            </div>
                        </div>
                        <label for="basic-url"><h5>End date</h5></label>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >To</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="endDate"
                                        className="form-control"
                                        placeholder="YYYY-MM-DD"
                                        aria-describedby="basic-addon3"
                                        onChange={event => this.onChangeHandler(event, "enddate")}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-12">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">Hour</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="HH:MM:SS"
                                        aria-describedby="basic-addon3"
                                        onChange={event => this.onChangeHandler(event, "endtime")}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >Username</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Search by username"
                                        aria-describedby="basic-addon3"
                                        onChange={event => this.onChangeHandler(event, "user")}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <ButtonToolbar >
                                    {['Secondary'].map(
                                        variant => (
                                            <DropdownButton
                                                title="Select Activity"
                                                variant={variant.toLowerCase()}
                                                id={`dropdown-variants-${variant}`}
                                                key={variant}
                                                onSelect={this.handleSelect}>
                                                <Dropdown.Item eventKey="edit"> Edit</Dropdown.Item>
                                                <Dropdown.Item eventKey="add"> Add</Dropdown.Item>
                                                <Dropdown.Item eventKey="delete"> Delete</Dropdown.Item>
                                                <Dropdown.Item eventKey="all">All </Dropdown.Item>
                                            </DropdownButton>
                                        ),
                                    )}
                                </ButtonToolbar>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.submitHandler} style={{ width: "150px" }}>
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-8 mt-4">
                                <label for="basic-url"><h4>Results:</h4></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mt-2">

                                <MyTable header={this.tableHeaders} data={this.state.audit} />


                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2"></div>
                            <div className="col-4">
                                {this.state.hasPrev &&
                                    <span className="fas" className="noselect ml-5"
                                        onClick={() => {
                                            this.state.page--
                                            this.submitHandler();
                                        }}>
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                        ></FontAwesomeIcon>{" "}
                                        Previous
                                    </span>
                                }
                            </div>
                            <div className="col-4">
                                {this.state.hasNext &&
                                    <span className="fas" onClick={() => {
                                        this.state.page++
                                        this.submitHandler();
                                    }}>
                                        Next{" "}
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                        ></FontAwesomeIcon>
                                    </span>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}