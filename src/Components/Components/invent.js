import React, { Component } from "react";
import ManagementService from "../services/inventoryservice";
import { Link } from "react-router-dom";
import Title, {title} from "./Title";
import {ButtonContainer} from "./ButtonContainer";
import Autocompletes from "./Autocomplete";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.clearscreen=this.clearscreen.bind(this);
    this.state = {
      tutorials: [],
        Productname:"",
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
    ManagementService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data,
          prods: response.data.Productname
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
    ManagementService.findByTitle(this.state.searchTitle)
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
  clearscreen(){
    this.retrieveTutorials();
  }
  render() {
    const { Productname, searchTitle, tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button            className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
          <div className="input-group-append">
            <ButtonContainer className="btn btn-outline-secondary" type="button" onClick={this.clearscreen}>Back to inventory</ButtonContainer>
                     </div>
        </div>
         <div className="col-lg-12">
          <Title title="Inventory"/>
          <div className="table">
          <table className="table table-responsive w-1500 d-block d-md-table ">
          <tr className={"table-primary"}>
                  <th>Productname</th>
                  <th>Serialno</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Vendor details</th>
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
                >
                  <td> {tutorial.Productname}</td>
                   <td>{tutorial.Serialno}</td>
                   <td>{tutorial.Quantity}</td>
                   <td>$ {tutorial.Price}</td>
                   <td>{tutorial.Name}</td>
                </tr>
              ))}
          </table>
          </div>

        </div>
             </div>
    );
  }
}