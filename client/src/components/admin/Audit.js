import React from "react";
import MyTable from '../shared/MyTable';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import { getAudit, getConstant } from '../../api/controllers/admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
export default class Audit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audit: [],
            actions: [],
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
            searchClicked: false
        }
    }
    tableHeaders = [{ key: "username", value: "Username", toSort: false },
    { key: "action_name", value: "Event", toSort: false },
    { key: "description", value: "Description", toSort: false },
    { key: "lastupdated", value: "Last Updated", toSort: false }
    ];

    // actions = ["edit", "add", "export", "report", "delete"];

    async componentDidMount() {
        const constant = await getConstant();
        const actions = constant.actionName;
        this.setState({
            actions: actions
        })

    }
    submitHandler = async e => {
        const result = await getAudit(this.state.event, this.state.users_names, this.state.orderby, this.state.page, this.state.size, this.state.startdate, this.state.enddate, this.state.starttime, this.state.endtime);
        if (result.history.length < 1) this.setState({
            noResult: true,
            audit: [],
            hasNext: false,
            hasPrev: false
        });
        else {
            const audit = result.history.map(data => ({
                username: data.user.username,
                action_name: data.action_name,
                description: data.description,
                lastupdated: data.date + "   " + data.time
            }))
            this.setState({
                audit: audit,
                hasNext: result.hasNext,
                hasPrev: result.hasPrev,
                noResult: false,
                searchClicked: true
            });
        }
        this.setState({
            event: "all"
        });

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
        this.setState({ event: target });
    }

    render() {

        return (
            <>
                <div className="">
                    <div className="container mt-5">
                        <div className="row mb-2">
                            <h2>Audit Search</h2>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">From date</span>
                                    </div>
                                    <input className="form-control"
                                        type="date"
                                        defaultValue=""
                                        id="date-local-input"
                                        onChange={event => this.onChangeHandler(event, "startdate")}>
                                    </input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">From hour</span>
                                    </div>
                                    <input className="form-control"
                                        type="time"
                                        defaultValue="00:00:00"
                                        id="time-local-input"
                                        onChange={event => this.onChangeHandler(event, "starttime")}>
                                    </input>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >To date</span>
                                    </div>
                                    <input className="form-control"
                                        type="date"
                                        defaultValue=""
                                        id="date-local-input"
                                        onChange={event => this.onChangeHandler(event, "enddate")}>
                                    </input>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-12">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">To hour</span>
                                    </div>
                                    <input className="form-control"
                                        type="time"
                                        defaultValue="23:59:59"
                                        id="time-local-input"
                                        onChange={event => this.onChangeHandler(event, "endtime")}>
                                    </input>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >Username</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter one username or more separated by comma"
                                        aria-describedby="basic-addon3"
                                        onChange={event => this.onChangeHandler(event, "user")}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <ButtonToolbar className="float-right" >
                                    {['Secondary'].map(
                                        variant => (
                                            <DropdownButton
                                                title="Select Activity"
                                                variant={variant.toLowerCase()}
                                                id={`dropdown-variants-${variant}`}
                                                key={variant}
                                                onSelect={this.handleSelect}>
                                                <Dropdown.Item eventKey="all">All </Dropdown.Item>
                                                {this.state.actions.map(action => (      
                                                    <Dropdown.Item eventKey={action}> {action.charAt(0).toUpperCase() + action.slice(1)}</Dropdown.Item>
                                                ))}
                                            </DropdownButton>
                                        ),
                                    )}
                                </ButtonToolbar>
                            </div>
                            <div className="col-lg-3 col-sm-6 ">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.submitHandler} style={{ width: "150px" }}>
                                    Search
                                </button>
                            </div>
                        </div>
                        {this.state.noResult &&
                            <div className="row float-center mt-5"><h5>There are no results that match your search</h5></div>}

                        {(this.state.searchClicked && !this.state.noResult) &&
                            <>
                                <div className="row">
                                    <div className="col-md-8 mt-4">
                                        <label htmlFor="basic-url"><h4>Results:</h4></label>
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
                            </>}
                    </div>
                </div>
            </>
        )
    }
}