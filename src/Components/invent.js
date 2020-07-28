import React, { Component } from "react";
import ManagementService from "../services/inventoryservice";
import { Link } from "react-router-dom";
import Title, {title} from "./Title";
import {ButtonContainer} from "./ButtonContainer";
import Autocompletes from "./Autocomplete";
import styled from 'styled-components';

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
      <ProductWrapper>
      <div className="list row bg">
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
       <div>
       <Autocompletes
     
        prods={this.state.tutorials}
      />
        console.log(tutoials)
       </div>
         <div className="col-lg-12">
          <Title title="Inventory"/>
          <div className="table">
          <table className="table table-responsive w-1500 d-block d-md-table ">
            <tbody>
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
              </tbody>
          </table>
          </div>

        </div>
             </div>
             </ProductWrapper>
    );
  }
}
const ProductWrapper=styled.div`
.bg{
  background-image: url("https://cutewallpaper.org/21/tumblr-blue-wallpaper/Pastels-Wallpaper-Tumblr-Kids-Iv-Clouds-Blue-Softtechhome.jpg");
  
  height: 100%;

  /* Center and scale the image nicely */

}

input {
  border: 1px solid #999;
  padding: 0.5rem;
  width: 300px;
}

.no-suggestions {
  color: #999;
  padding: 0.5rem;
}

.suggestions {
  border: 1px solid #999;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  width: calc(300px + 1rem);
}

.suggestions li {
  padding: 0.5rem;
}

.suggestion-active,
.suggestions li:hover {
  background-color: #008f68;
  color: #fae042;
  cursor: pointer;
  font-weight: 700;
}

.suggestions li:not(:last-of-type) {
  border-bottom: 1px solid #999;
}
`