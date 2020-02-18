import React from "react";
import MyTable from '../shared/MyTable';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import { getAudit } from '../../api/controllers/admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
export default class Audit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audit: [],
            event: '',
            user_id: '',
            orderby: '',
            page: 1,
            size: 20,
            startdate: '',
            enddate: '',
            starttime: '',
            endtime: '',
            hasNext: false,
            hasPrev: false
        }
    }
    tableHeaders = [{ key: "username", value: "Username", toSort: true, sortOrder: true },
    { key: "action_name", value: "Event", toSort: true, sortOrder: true },
    { key: "description", value: "Description", toSort: false, sortOrder: true },
    { key: "lastupdated", value: "Last Updated", toSort: true, sortOrder: true }
    ];

    submitHandler = async e => {
        const result = await getAudit(this.state.event, this.state.user_id, this.state.orderby, this.state.page, this.state.size, this.state.startdate, this.state.enddate, this.state.starttime, this.state.endtime);
        const audit = result.history.map(data => ({
            username: data.user.username,
            action_name: data.action_name,
            description: data.description,
            lastupdated: data.date + "   " + data.time
        }));

        this.setState({
            audit: audit,
            hasNext: result.hasNext,
            hasPrev: result.hasPrev
        });
    }

    render() {

        return (
            <>
                <div className="">
                    <div className="container mt-5">
                        <div className="row  ">
                            <h1>Audit Search</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <ButtonToolbar>
                                    {['Secondary'].map(
                                        variant => (
                                            <DropdownButton
                                                title={'Show result for all activities'}
                                                variant={variant.toLowerCase()}
                                                id={`dropdown-variants-${variant}`}
                                                key={variant}
                                            >
                                                <Dropdown.Item eventKey="1"> Event1</Dropdown.Item>
                                                <Dropdown.Item eventKey="2"> Event2</Dropdown.Item>
                                                <Dropdown.Item eventKey="3"> Event3</Dropdown.Item>
                                                <Dropdown.Item eventKey="4"> Event4</Dropdown.Item>
                                                <Dropdown.Item eventKey="5">All </Dropdown.Item>
                                            </DropdownButton>
                                        ),
                                    )}
                                </ButtonToolbar>
                            </div>

                        </div>

                        <label for="basic-url"><h4>Start date</h4></label>

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
                                        placeholder="00/00/0000"
                                        aria-describedby="basic-addon3"
                                        onChange={this.changeHandler}
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
                                        placeholder="00:00"
                                        aria-describedby="basic-addon3"
                                    />
                                </div>
                            </div>
                        </div>
                        <label for="basic-url"><h4>End date</h4></label>
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
                                        placeholder="00/00/0000"
                                        aria-describedby="basic-addon3"
                                        onChange={this.changeHandler}
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
                                        placeholder="00:00"
                                        aria-describedby="basic-addon3"
                                    />

                                </div>
                            </div>
                        </div>
                        <label for="basic-url"><h4>Users</h4></label>

                        <div className="row">
                            <div className="col-md-6">
                                <>
                                    <InputGroup className="mb-3">

                                        <FormControl aria-describedby="basic-addon1" name='id' onChange={this.changeHandler} />
                                    </InputGroup>

                                </>
                            </div>
 
                            <div className="col-md-3 ">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={this.submitHandler} style={{ width: "150px" }}>
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-8">
                                <label for="basic-url"><h4>Results:</h4></label>

                            </div>


                        </div>
                        <div className="row">
                            <div className="col-md-10 mt-4">

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