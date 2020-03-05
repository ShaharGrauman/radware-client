import React from "react";
import { Dropdown } from 'react-bootstrap';
import { Badge } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { getResearcher, getSignatures, copySignature } from '../../../api/controllers/reports'
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faEdit, faCopy } from "@fortawesome/free-solid-svg-icons";
import ReportsTable from '../ReportsTable';

class ResearcherDashboard extends React.Component {
  state = { currentButton: "all" }
  constructor(props) {
    super(props);
    this.state = {
      hasNext: false,
      hasPrev: false,
      dataFilter: 'All Singatures ',
      data: [{ patternID: '', description: '' }],
      signaturesCountByStatus: [{ Count: 0 }, { Count: 0 }, { Count: 0 }, { Count: 0 }, { Count: 0 }, { Count: 0 }],
      currentButton: 'all',
      clickedButton: '',
      nextClicked: false,
      prevClicked: false,
      errorMsg: '',
      searchClicked: false,
      createOrEditSignatureClicked: false,
      QAClicked: false,
      TestingClicked: false,
      GitClicked: false,
      cveIdReportClicked: false,
      page: 1
    }
    this.urlDetails = { page: 1, size: 10, };
  }

  renderRedirect = page => {
    if (page === "search") {
      this.setState({
        searchClicked: true
      });
    }

    if (page === "createOrEditSignature") {
      this.setState({
        createOrEditSignatureClicked: true
      });
    }

    if (page === "QA") {
      this.setState({
        QAClicked: true
      });
    }

    if (page === "Testing") {
      this.setState({
        TestingClicked: true
      });
    }

    if (page === "Git") {
      this.setState({
        GitClicked: true
      });
    }

    if (page === "CveIdReport") {
      this.setState({
        cveIdReportClicked: true
      });
    }
  }

  componentDidMount = async e => {
    const res = await getSignatures(`signature/researcher?status=all&page=1&size=${this.urlDetails.size}`);
    this.setState({ hasNext: res.hasNext, hasPrev: res.hasPrev })
    if (res.signatureData.length == 0) {
      this.setState({
        data: [{ patternID: '', description: '' }]
      });
    } else {
      this.setState({ signaturesCountByStatus: res.signaturesCountByStatus, data: res.signatureData })
    }
  }

  loadData = async (filter) => {
    let requestURL;
    if (this.state.currentButton == filter && !this.state.nextClicked) {
      this.setState({ currentButton: "all" });
      requestURL = `signature/researcher?status=all&page=1&size=${this.urlDetails.size}`;
      this.setState({ dataFilter: "All Signatures" });
    } else {
      requestURL = `/signature/researcher?status=${filter}`;
      Object.keys(this.urlDetails).forEach(key => requestURL = requestURL.concat(`&${key}=${this.urlDetails[key]}`))
      requestURL.slice(1)
    }
    const res = await getResearcher(requestURL);
    this.setState({ hasNext: res.hasNext, hasPrev: res.hasPrev })
    if (res.signatureData.length == 0) {
      this.setState({
        data: [{ patternID: '', description: '' }]
      });
    } else {
      this.setState({ data: res.signatureData });
    }
  }

  selectButton = (value) => {
    this.urlDetails.page = 1;
    this.setState({ page: this.urlDetails.page })
    this.setState({ clickedButton: value });
    this.setState({ dataFilter: `${value} Signatures` });
  }

  copySignature = async (id) => {
    const { data } = await copySignature(id);
    this.props.history.push(`/createOrEditSignature/${data.id}`)
  }
  render() {
    let newData = this.state.data.map(sig => (
      {
        ...sig,
        Edit:
          <div>
            <Link to={`/createOrEditSignature/${sig.id}`}>
              <FontAwesomeIcon
                className="fa-lg float-left"
                icon={faEdit}
                style={{ color: 'blue', cursor: 'pointer' }}
              ></FontAwesomeIcon>
            </Link>
            <FontAwesomeIcon
              onClick={() => {
                this.copySignature(sig.id)
              }}
              className="fa-lg float-right"
              icon={faCopy}
              style={{ color: 'red', cursor: 'pointer' }}>
            </FontAwesomeIcon>
          </div>
      }
    ));

    const testData = {
      tableStyle: {
        style: { borderWidth: "3px", width: '100%' },
        className: 'table table-striped table-hover table-bordered border-dark'
      },
      tableHeader: [
        { value: 'pattern_id', valueToShow: 'PatterID', style: { width: "10%" }, sort: true },
        { value: 'description', valueToShow: 'description', style: { width: "40%" }, sort: true },
        { value: 'Edit', valueToShow: 'Edit/Copy', style: { width: "10%" }, sort: false },
      ],
      tableData: newData
    }

    return (
      <div className='mx-3'>
        {this.state.searchClicked && <Redirect to='/SearchSignature' />}
        {this.state.createOrEditSignatureClicked && <Redirect to='/createOrEditSignature' />}
        {this.state.QAClicked && <Redirect to='/Export/QA' />}
        {this.state.TestingClicked && <Redirect to='/Export/Testing' />}
        {this.state.GitClicked && <Redirect to='/Export/Git' />}
        {this.state.cveIdReportClicked && <Redirect to='/CveIdReport' />}
        <h2 className="ml mb-3">Researcher dashboard</h2>
        <div className='row'>
          <div className='ml-2 mr-4'>
            <button type="button" className="ml-2 mr-4 btn btn-secondary" onClick={() => this.renderRedirect("createOrEditSignature")}>
              New
          </button>
            <button type="button"
              onClick={() => this.renderRedirect("search")}
              className="ml-2 mr-4 btn btn-secondary">Search</button>
          </div>

          <div className='ml-2 mr-4'>
            <Dropdown >
              <Dropdown.Toggle className="btn btn-secondary dropdown-toggle mr-4" id="dropdown-basic">
                Export
          </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.renderRedirect("QA")}>QA</Dropdown.Item>
                <Dropdown.Item onClick={() => this.renderRedirect("Testing")}>Testing</Dropdown.Item>
                <Dropdown.Item onClick={() => this.renderRedirect("Git")}>Git</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <button type="button"
            onClick={() => this.renderRedirect("CveIdReport")}
            className="ml-2 mr-4 btn btn-secondary">CveId</button>
        </div>
        <div className="ml-2 mt-3 mx-">
          <h5 className=" mb-2">{this.state.dataFilter} by Create Date</h5>
        </div>
        <div className="container ml-0">
          <div className="row">
            <div className="col-7">
              <div className="row">
                <ReportsTable data={testData} />
              </div>
              <div className="row mx-auto">
                <div className="col">
                  <div className="row">
                    <div className="col-2"></div>
                    <div className="col-3 col-sm-3 col-md-2" >
                      {this.state.hasPrev ?
                        <span className="fas" onClick={() => {
                          this.urlDetails.page--;
                          this.state.nextClicked = true;
                          this.loadData(this.state.currentButton);
                          this.state.nextClicked = false;
                          this.setState({ page: this.urlDetails.page })
                        }}>
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                          ></FontAwesomeIcon>
                          Previous
                         </span>
                        : null
                      }
                    </div>
                    <div className="col-1 col-lg-0 mx-2 mx-sm-2 mx-md-0">
                      <span class="badge badge-secondary">{this.state.page}</span>
                    </div>
                    <div className="col-3 col-sm-2">
                      {this.state.hasNext ?
                        <span className="fas" onClick={() => {
                          this.state.nextClicked = true;
                          this.urlDetails.page++;
                          this.loadData(this.state.currentButton);
                          this.state.hasPrev = true;
                          this.state.nextClicked = false;
                          this.setState({ page: this.urlDetails.page })
                        }}>Next
                          <FontAwesomeIcon
                            icon={faArrowRight}
                          ></FontAwesomeIcon>
                        </span>
                        : null
                      }
                    </div>
                    <div className="col-2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="container ">
                <div className="row">
                  <div className="col">
                    Version status
                    <button
                      type="button"
                      className={this.state.clickedButton === "inProgress" && this.state.currentButton == "in_progress" ? "outline- mt-3 btn btn-secondary btn-block  text-left" : "outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={
                        () => {
                          this.selectButton("inProgress");
                          this.setState({ currentButton: 'in_progress' });
                          this.loadData("in_progress");
                        }
                      }
                    >
                      <i className="fas fa-star"></i> In progress
                      <Badge pill variant="info" className=" ml-3"> {this.state.signaturesCountByStatus[1].Count} </Badge>
                    </button>
                    <button
                      type="button"
                      className={this.state.clickedButton === "inTest" && this.state.currentButton == "in_test" ? "outline- mt-3 btn btn-secondary btn-block  text-left" : "outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={() => {
                        this.selectButton("inTest");
                        this.setState({ currentButton: "in_test" });
                        this.loadData("in_test");
                      }
                      }
                    >
                      <i className="fas fa-star-half-alt"></i> In test
                      <Badge pill variant="info" className=" ml-3"> {this.state.signaturesCountByStatus[2].Count} </Badge>
                    </button>
                    <button
                      type="button"
                      className={this.state.clickedButton === "inQa" && this.state.currentButton == "in_qa" ? "outline- mt-3 btn btn-secondary btn-block  text-left" : "outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={() => {
                        this.selectButton("inQa");
                        this.setState({ currentButton: "in_qa" });
                        this.loadData("in_qa");
                      }
                      }
                    >
                      <i className="fas fa-star-half"></i> In QA
                      <Badge pill variant="info" className=" ml-3"> {this.state.signaturesCountByStatus[3].Count} </Badge>
                    </button>
                  </div>
                  <div className="col">
                    Production status
                    <button
                      type="button"
                      className={this.state.clickedButton === "Published" && this.state.currentButton == "Published" ? "outline- mt-3 btn btn-secondary btn-block  text-left" : "outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={() => {
                        this.selectButton("Published");
                        this.setState({ currentButton: "Published" });
                        this.loadData("Published");
                      }
                      }
                    >
                      <i className="far fa-star"></i> Published
                      <Badge pill variant="info" className=" ml-3"> {this.state.signaturesCountByStatus[0].Count} </Badge>
                    </button>
                    <button

                      type="button"
                      className={this.state.clickedButton === "Suspended" && this.state.currentButton == "Suspended" ? "outline- mt-3 btn btn-secondary btn-block  text-left" : "outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={() => {
                        this.selectButton("Suspended");
                        this.setState({ currentButton: "Suspended" });
                        this.loadData("Suspended");
                      }
                      }

                    >
                      <i className="fas fa-exclamation-triangle"></i> Suspended

                      <Badge pill variant="info" className=" ml-3">{this.state.signaturesCountByStatus[4].Count} </Badge>


                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default withRouter(ResearcherDashboard);

