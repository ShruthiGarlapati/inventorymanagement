import React, { Component } from 'react';
import {ButtonContainer} from './ButtonContainer';
import ReactFormInputValidation from 'react-form-input-validation';
import Title from './Title';
import axios from 'axios';
import ManagementService from '../services/inventoryservice';
import http from '../http-common';

export default class NewItemTab extends Component {
 
  constructor(props)
  {
      super(props);
      this.handleProductnameChange = this.handleProductnameChange.bind(this);
      this.handleSerialnoChange = this.handleSerialnoChange.bind(this);
      this.handleQuantityChange = this.handleQuantityChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.saveTutorial=this.saveTutorial.bind(this);
      this.newTutorial=this.newTutorial.bind(this);
     
          this.state={
             id: null,
            Productname:"",
            Serialno:"",
            Quantity:"",
            Price:"",
            Name:"",

            errors: {}
        };
          this.form= new ReactFormInputValidation(this);
           this.form.useRules({
          Productname: "required",
          Serialno: "required",
          Quantity: "required|numeric",
          Price: "required|numeric",
          Name: "required",
        });
      
          }
       
     handleProductnameChange(e) {
        this.setState({Productname: e.target.value});
     }
      handleSerialnoChange(e) {
        this.setState({Serialno: e.target.value});
      }
      handleQuantityChange(e) {
        this.setState({Quantity: e.target.value});
      }
      handlePriceChange(e) {
        this.setState({Price: e.target.value});
      }
      handleNameChange(e) {
        this.setState({Name: e.target.value});
      } 
          saveTutorial() {
            var data = {
              Productname: this.state.Productname,
              Serialno: this.state.Serialno,
              Quantity: this.state.Quantity,
              Price: this.state.Price,
              Name: this.state.Name,
            };
        
            ManagementService.create(data)
              .then(response => {
                this.setState({
                  id: response.data.id,
                  Productname: response.data.Productname,
                  Serialno: response.data.Serialno,
                  Price: response.data.Price,
                  Quantity: response.data.Quantity,
                  Name: response.data.Name,
        
                  submitted: true
                });
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
          }
        
          newTutorial() {
            this.setState({
              id: null,
              Productname: "",
              Serialno: "",
              Quantity: "",
              Price: "",
              Name: "",
        
              submitted: false
            });
          }
        
                 

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
         
      <div className="newitem marginTop:10">
        <Title name="Add new Product"></Title> 
         <div className="form-group">
             <label> Product Name: </label>
           <input type ="text" className="form-control"  name="Productname" onBlur={this.form.handleBlurEvent}
             onChange={this.handleProductnameChange}
               value={this.state.Productname}/><br/>
               </div>
               <label className="error">
                {this.state.errors.Productname ? this.state.errors.Productname : ""}
              </label>
<div className="form-group">
             <label> Serial Number: </label>
   <input type ="text" className="form-control"  name="Serialno" onBlur={this.form.handleBlurEvent}
   onChange={this.handleSerialnoChange}
   value={this.state.Serialno}/><br/>
  </div>
  <label className="error">
                {this.state.errors.Serialno ? this.state.errors.Serialno : ""}
              </label>
  <div className="form-group">
             <label> Quantites Received: </label>
   <input type ="numeric" className="form-control" name="Quantity" onBlur={this.form.handleBlurEvent}
   onChange={this.handleQuantityChange}
   value={this.state.Quantity}/><br/>
  </div>
  <label className="error">
                {this.state.errors.Quantity ? this.state.errors.Quantity : ""}
              </label>
  <div className="form-group">
             <label className="mx-auto text-title text-dark"> Price per unit: </label>
   <input type ="numeric" className="form-control"  name="Price" onBlur={this.form.handleBlurEvent}
   onChange={this.handlePriceChange}
   value={this.state.Price}/><br/>
      </div>
      <label className="error">
                {this.state.errors.Price ? this.state.errors.Price : ""}
              </label>
  <div className="form-group">
             <label> Vendor Name: </label>
   <input type ="text" className="form-control" name="Name" onBlur={this.form.handleBlurEvent}
   onChange={this.handleNameChange}
   value={this.state.Name}/><br/>
  </div>
  <label className="error">
                {this.state.errors.Name ? this.state.errors.Name : ""}
              </label>
  <div className="form-group">
   <button onClick={this.saveTutorial} className="btn btn-dark">Submit </button>
   </div>
</div>

        )}
        </div>
        
    )
  }
}   