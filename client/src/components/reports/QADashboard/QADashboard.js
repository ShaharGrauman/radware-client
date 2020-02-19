import React, { useState } from "react";
import axios from 'axios'

import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

import QATable from './QATable';
import './QADashboard.css';


export default class QADashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            updateSelectedButton: 'Update selected',
            hasNext: 'true',
            hasPrev: 'false',
            page: 1,
            dataToShow: [],
            allPressed: false,
            popupAlert: false,

            clickedButton: {
                role: [],
                value: '',
                msg: '',
                callBack: ''
            }

        };
        this.data = [];
        this.size = 15;
        this.role = ['manual', 'performance', 'automation']
        // this.role=['manual','performance','automation']  

        this.ConfirmAlert = this.ConfirmAlert.bind(this);

    }

    async componentDidMount() {
        try {
            const { data } = await axios.get('http://localhost:3000/Qa/dashboard');
            this.data = data.sort((a, b) => a.patternID - b.patternID);
            console.log(this.data)
            this.setState({ dataToShow: data.slice(0, this.size), page: 1 })
            // console.log(this.state.data)
        } catch (error) {
            window.alert('Error');
        }
    }

    updateData = async e => {

        this.setState({ updateSelectedButton: 'loading...', allPressed: false });
        const urlBody = [];
        this.data.forEach(signature => {
            const oneSigUpdate = { id: signature.id }
            this.role.forEach(role => {
                oneSigUpdate[role] = signature[role]
            })
            urlBody.push(oneSigUpdate)
        })

        try {
            const { data: msg } = await axios.put('http://localhost:3000/Qa/dashboard', JSON.stringify(urlBody), { headers: { "Content-Type": "application/json" } });
            this.setState({ updateSelectedButton: msg })
            setTimeout(() =>
                this.setState({ updateSelectedButton: 'Update Selected' })
                , 3000);
        } catch (error) {
            this.setState({ updateSelectedButton: 'Error in update' })
            setTimeout(() =>
                this.setState({ updateSelectedButton: 'Update Selected' })
                , 3000);
        }
    }

    selectData = () => {
        this.data.forEach(signature => {
            this.state.clickedButton.role.forEach(role =>
                signature[role] = this.state.clickedButton.value
            )
        });
        this.setState({ allPressed: true })
    }


    ConfirmAlert() {
        const handleClose = () => this.setState({ popupAlert: false });
        const onAccept = () => {
            this.state.clickedButton.callBack()
            this.setState({ popupAlert: false })
        }

        return (
            <div onKeyPress={e => {
                e.key == 'Enter' && onAccept()
            }}>
                <Modal show={this.state.popupAlert} onHide={handleClose} >
                    <Modal.Body>
                        {this.state.clickedButton.msg}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {
                            this.setState({ popupAlert: false });
                        }}>
                            Cancel
                </Button>
                        <Button variant="primary" onClick={onAccept}>
                            Yes
                </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }



    render() {
        if (this.data.length == 0) {
            return (
                <>
                    <h2 className="ml-2 mb-3">QA dashboard</h2>
                    <h5 className="ml-2 mb-3">Update signatures status at QA (signatures in QA status)</h5>
                    <br></br>
                    <div className="container ml-0 mt-2">
                        <div className="row">
                            <div className="col">
                                <QATable data={[{
                                    seq_id: 0,
                                    patternID: "THERE",
                                    URI: 'IS',
                                    headers: 'NO',
                                    body: 'SIGNATURES',
                                    parameters: 'TO',
                                    file: 'UPDATE',
                                    manual: ':)',
                                    performance: ':)',
                                    automation: ':)'
                                }]} role={['']} />
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <h2 className="ml-3 mb-3">QA dashboard</h2>
                    <h5 className="ml-3 mb-3">Update signatures status at QA (signatures in QA status)</h5>
                    <div className="container ml-0 mt-2">
                        <div className="row">
                            <div className="col">
                                <QATable data={this.state.dataToShow} role={this.role} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-1 col-sm-1 col-md-2 col-lg-3 mx-sm-1 mx-md-2 mx-lg-0"></div>
                            <div className="col-3 col-sm-3 col-md-2 ml-5 " >
                                {this.state.page > 1 ?
                                    <span className="fas" className="noselect ml-5" onClick={() => {
                                        const newPage = this.state.page - 1
                                        this.setState({ dataToShow: this.data.slice((newPage - 1) * this.size, newPage * this.size) })
                                        this.setState({ page: newPage });
                                    }}
                                    style={{cursor:'pointer' }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                        ></FontAwesomeIcon>{" "}
                                        Previous
                        </span>
                                    : null
                                }
                            </div>
                            <div className="col-1 col-lg-0 mx-2 mx-sm-2 mx-md-0">
                                <span class="badge badge-secondary">{this.state.page}</span>

                            </div>
                            <div className="col-3 col-sm-2">
                                {this.size * this.state.page < this.data.length ?
                                    <span className="fas" onClick={() => {
                                        const newPage = this.state.page + 1
                                        this.setState({ dataToShow: this.data.slice((newPage - 1) * this.size, newPage * this.size) })

                                        this.setState({ page: newPage });
                                    }}
                                    style={{cursor:'pointer' }}
                                    

                                    >
                                        Next{" "}
                                        <FontAwesomeIcon
                                            icon={faArrowRight}
                                        ></FontAwesomeIcon>
                                    </span>
                                    : null
                                }

                            </div>
                        </div>
                    </div>

                    <Row>
                        {!this.state.allPressed ?
                            <Col xs={2}></Col> :
                            <Col xs={1}></Col>
                        }

                        <Col xs={2}>
                            <button className="btn btn-secondary " type="submit" style={{ width: "150px" }} onClick={() => {
                                this.setState({
                                    clickedButton: {
                                        role: this.role,
                                        value: 'passed',
                                        msg: 'Are you sure you want to update signatures!',
                                        callBack: this.updateData
                                    },
                                    popupAlert: true
                                })
                            }}>
                                {this.state.updateSelectedButton}
                            </button>

                        </Col>
                        {this.state.allPressed &&
                            <Col xs={2}>
                                <button className="btn btn-secondary " style={{ width: "150px" }} onClick={() => {
                                    this.componentDidMount();
                                    this.setState({ allPressed: false })
                                }}>
                                    RESET
                        </button>
                            </Col>
                        }
                        <Col xs={2}>

                            <Dropdown as={ButtonGroup}>
                                <Button variant="secondary " onClick={() => {
                                    this.setState({
                                        clickedButton: {
                                            role: this.role,
                                            value: 'passed',
                                            msg: `Are you sure you want to select all ${this.role.join(' and ')} signatures as passed?`,
                                            callBack: this.selectData
                                        },
                                        popupAlert: true
                                    })
                                }}>All passed</Button>
                                <Dropdown.Toggle split variant="secondary ml-1" id="dropdown-split-basic" />
                                <Dropdown.Menu>
                                    {this.role.map((role, index) =>
                                        <Dropdown.Item onClick={() => {
                                            this.setState({
                                                clickedButton: {
                                                    role: [role],
                                                    value: 'passed',
                                                    msg: `Are you sure you want to select all ${role} signatures as passed?`,
                                                    callBack: this.selectData
                                                },
                                                popupAlert: true
                                            })
                                        }}>{role}</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col xs={2}>

                            <Dropdown as={ButtonGroup}>
                                <Button variant="secondary" onClick={() => {
                                    this.setState({
                                        clickedButton: {
                                            role: this.role,
                                            value: 'failed',
                                            msg: `Are you sure you want to select all ${this.role.join(' and ')} signatures as failed?`,
                                            callBack: this.selectData
                                        },
                                        popupAlert: true
                                    })
                                }}>All failed</Button>
                                <Dropdown.Toggle split variant="secondary ml-1" id="dropdown-split-basic" size="sm" />
                                <Dropdown.Menu>
                                    {this.role.map((role, index) =>
                                        <Dropdown.Item onClick={() => {
                                            this.setState({
                                                clickedButton: {
                                                    role: [role],
                                                    value: 'failed',
                                                    msg: `Are you sure you want to select all ${role} signatures as failed?`,
                                                    callBack: this.selectData
                                                },
                                                popupAlert: true
                                            })
                                        }}>{role}</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <this.ConfirmAlert />

                    </Row>
                </>);
        }
    }
}

