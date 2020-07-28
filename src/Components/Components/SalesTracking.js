import React, { Component } from "react";
import ManagementService from "../services/inventoryservice";
import { Link } from "react-router-dom";
import Title from "./Title";
import AutoComplete from './Autocomplete';
 
export default class SalesTracking extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSearchDate = this.onChangeSearchDate.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.searchDate = this.searchDate.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    ManagementService.getAllcust()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    ManagementService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    ManagementService.findByTitles(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchDate() {
    ManagementService.findByDate(this.state.searchDate)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  onChangeSearchDate(e) {
    const searchDate = e.target.value;

    this.setState({
      searchDate: searchDate
    });
  }


  render() {
    const { searchDate, searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      //<Autocomplete tutorials={this.state.tutorials}></Autocomplete>


      <div className="mx-auto">
        <div className="col-md-5">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Customer details"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="input-group mb-3">
            <input id="text"
              type="date"
              className="form-control"
              placeholder="Search by date"
              value={searchDate}
              onChange={this.onChangeSearchDate}
            />
            <div className="input-group-append">
              <button            className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchDate}
              >
                Search
              </button>
            </div>
          </div>
          </div>
      
          <div className="col-lg-12">

          <table className="table table-responsive w-1500 d-block d-md-table ">
             <tr className={"table-primary"}>
                  <th>Customer name</th>
                  <th>Product name</th>
                  <th>Serial no</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
          
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <tr 
                  className={
                    "table-active " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                ><td>
                     {tutorial.Customername}</td>
                  <td>{tutorial.pding} </td>
                  <td>{tutorial.Serialno} </td>
                  <td>{tutorial.Quantity} </td>
                  <td>{tutorial.Price} </td>
                  <td>{tutorial.Currentdate} </td>
                  </tr>
              ))}
          </table>

          )
        </div>
      </div>
    );
  }
}