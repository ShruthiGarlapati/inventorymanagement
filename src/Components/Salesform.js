import React, { Component } from 'react';
import Title from './Title';
import ReactFormInputValidation from 'react-form-input-validation';
import e from 'cors';
import ManagementService from '../services/inventoryservice';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';
import {saveAs} from 'file-saver';
import http from '../http-common';
import Autocompletes from './Autocomplete';
import {ButtonContainer} from './ButtonContainer';
import styled from 'styled-components';

var Typeahead = require('react-typeahead').Typeahead;

class Salesform extends Component {
  

   
      constructor(props)
    {
        super(props);
        this.handleCustomernameChange=this.handleCustomernameChange.bind(this);
        this.handleAdressChange=this.handleAdressChange.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
        this.handlepdingchange= this.handlepdingchange.bind(this);
        this.handleSerialnochange= this.handleSerialnochange.bind(this);
        this.handleQuantityChange= this.handleQuantityChange.bind(this);
        this.handlePriceChange= this.handlePriceChange.bind(this);
        this.handleNameChange= this.handleNameChange.bind(this);
        this.saveTutorial=this.saveTutorial.bind(this);
        this.createPdf=this.createPdf.bind(this);
        this.createform=this.createform.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.retrieveFields = this.retrieveFields.bind(this);
        //this.setActiveTutorial = this.setActiveTutorial.bind(this);
        //this.retrieveTutorials = this.retrieveTutorials.bind(this);
            
             /* tutorials: [],
             currentTutorial: null,
             currentIndex: -1,
             searchTitle: "",*/
            // id: null,
            this.state={  Customername:"",
              Adress:"",
              Date: "",
              pding:"",
              Serialno:"",
              Quantity:"",
              Price:"",
              Name:"",
              tutorials: [],
              currentTutorial: null,
              currentIndex: -1,
              searchTitle: "",

            errors: {}
          } 
          this.form= new ReactFormInputValidation(this);
          this.form.useRules({
            Customername:"required",
              Adress:"required",
              Date:"required",
              pding: "required",
            Serialno: "required",
            Quantity: "required|numeric",
            Price: "required|numeric",
            Name: "required",
          });
        }

       /*  componentDidMount()
          {
            this.retrieveTutorials();
          }*/
           
          handleCustomernameChange(e) {
               this.setState({Customername: e.target.value});
         } 
         handleAdressChange(e) {
          this.setState({Adress: e.target.value});
       } 
       handleDateChange(e) {
        this.setState({Date: e.target.value});
     }
     handlepdingchange(e)
     {
       this.setState({pding: e.target.value});
     }
     handleNameChange(e)
     {
      this.setState({Name: e.target.value}); 
     }
     handleQuantityChange(e)
     {
      this.setState({Quantity: e.target.value});
     }
     handleSerialnochange(e)
     {
      this.setState({Serialno: e.target.value});
     }
     handlePriceChange(e)
     {
      this.setState({Price: e.target.value});
     }
     createPdf(){

      var data = {
        Customername: this.state.Customername,
        Adress: this.state.Adress,
        Date: this.state.Date,
        pding: this.state.pding,
        Serialno: this.state.Serialno,
        Quantity: this.state.Quantity,
        Price: this.state.Price,
        Name: this.state.Name,
      };
       http.post("/tutorials/customer/create-pdf", data )
       .then(response => {
        this.setState({
        //  id: response.data.id,
         Customername: response.data.Customername,
         Adress: response.data.Adress,
         Date: response.data.Date,
         pding: response.data.pding,
         Serialno: response.data.Serialno,
         Price: response.data.Price,
         Quantity: response.data.Quantity,
         Name: response.data.Name,

         submitted: true
       });
      }
    )
       .then(() => http.get("/tutorials/customer/fetch-pdf", { responseType: 'blob' }))
       .then((res) => { 
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'generatedDocument.pdf')
      })
     

     }

     
    setActiveTutorial(tutorial, index) {
      this.setState({
        currentTutorial: tutorial,
        currentIndex: index
      });
    }
    
    retrieveFields() {
      ManagementService.findByTitle(this.state.pding)()
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

    saveTutorial() {
      var data = {
        Customername: this.state.Customername,
        Adress: this.state.Adress,
        Date: this.state.Date,
        pding: this.state.pding,
        Serialno: this.state.Serialno,
        Quantity: this.state.Quantity,
        Price: this.state.Price,
        Name: this.state.Name,
      };
     
  
      ManagementService.createCustomer(data)
        .then(response => {
           this.setState({
            id: response.data.id,
            Customername: response.data.Customername,
            Adress: response.data.Adress,
            Date: response.data.Date,
            pding: response.data.pding,
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
      createform()
      {

      }
  
    render() {
      const{tutorials, currentIndex, currentTutorial}=this.state;
        return (
          <ProductWrapper>
          <div className="newitem marginTop:10 bg">                 
          <Title name="Customer" title="Details"></Title>
                 <section className="sections block">
                             <div className="form-group">
             <label> Customer Name: </label>
   <input type ="text" className="form-control" placeholder="Customer name" name="Customername"
   onBlur={this.form.handleBlurEvent} onChange={this.handleCustomernameChange} value={this.state.Customername} /><br/>
   <label className="error">
    {this.state.errors.Customername? this.state.errors.Customername: ""}
  </label>
  </div>
  <div className="form-group">
             <label> Address: </label>
   <input type ="textarea" className="form-control" placeholder="Adress" name="Adress"
   onBlur={this.form.handleBlurEvent}onChange={this.handleAdressChange} value={this.state.Adress}/><br/>
    <label className="error">
    {this.state.errors.Adress? this.state.errors.
    Adress: ""}
  </label>
  </div>
  <div className="form-group">
             <label> Date: </label>
   <input type ="date" className="form-control" name="Date" onBlur={this.form.handleBlurEvent}
   onChange={this.handleDateChange} value={this.state.Date}/><br/>
    <label className="error">
    {this.state.errors.Date? this.state.errors.Date: ""}
  </label>
  </div>
 
  </section>
  
  <section className="Products box">
  <Title name="Products"></Title>
  <div className="form-group">
               <label> Product Name: </label>
   <input type ="text" className="form-control" name="pding" 
   onBlur={this.form.handleBlurEvent}
   onChange={this.handlepdingchange}
   value={this.state.pding}
   />
  <label className="error">
    {this.state.errors.pding? this.state.errors.pding: ""}
  </label>
  </div>
  
  <div className="form-group">
             <label> Serial Number: </label>
   <input type ="text" className="form-control"  name="Serialno"  
   onBlur={this.form.handleBlurEvent}
   onChange={this.handleSerialnochange}
   value={this.state.Serialno}/><br/>
    <label className="error">
    {this.state.errors.Serialno? this.state.errors.Serialno: ""}
  </label>
  </div>
  <div className="form-group">
             <label> Quantites Sold: </label>
   <input type ="number" className="form-control" name="Quantity" 
   onBlur={this.form.handleBlurEvent}
   onChange={this.handleQuantityChange}
   value={this.state.Quantity}
   /><br/>
   <label className="error">
    {this.state.errors.Quantity? this.state.errors.Quantity: ""}
  </label>
  </div>
  <div className="form-group">
             <label className="mx-auto text-title text-dark"> Price per unit: </label>
   <input type ="number" className="form-control"  name="Price" 
   onBlur={this.form.handleBlurEvent}
   onChange={this.handlePriceChange}
   value={this.state.Price}/><br/>
    <label className="error">
    {this.state.errors.Price? this.state.errors.Price: ""}
  </label>
  </div>
  <div className="form-group">
  </div>
  <div className="form-group">
  <button onClick={this.createform} className="btn btn-dark">Add product </button>
   <button onClick={this.saveTutorial} className="btn btn-dark">Submit </button>
   </div>
   </section>
   <section>
     <Title name="Invoice number"></Title>
     <div className="text-center">
     <h3  >    
          <ButtonContainer onClick={this.createPdf}  > 123 </ButtonContainer>
      </h3>
     </div>
   </section>
</div>
</ProductWrapper>
        );
    }
   
            }

export default Salesform;
const ProductWrapper=styled.div`
.bg{
  background-image: url("https://cutewallpaper.org/21/tumblr-plain-backgrounds/Images-of-Light-Blue-Background-Tumblr-SpaceHero.jpg");
  
  height: 100%;

  /* Center and scale the image nicely */

}
`