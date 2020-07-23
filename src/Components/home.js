import React, { Component } from 'react';
import Title from './Title';
import {Link} from 'react-router-dom';
import {ButtonContainer} from "./ButtonContainer";
import styled from 'styled-components';

export default class home extends Component {
    render() {
        return (
          <ProductWrapper>
            <div class="bg">
  <div class="jumbotron bg mb-0">
  <Title name="Inventory" title="Management"/>
    <p class="font-weight-bold text-center text-light" >Welcome to inventory management web application. Here, you'll be able to add a new product, register sold products along with customer details, have a view of your inventory and track your sales at ease</p>
  </div>
  <div>
<div class="mb-3" >
  <h1 class="text-center text-dark text-weighted-bold">Add Product</h1>
    <p class="text-center text-dark">Do you have a new product or an update quantities of a pre-existing one? 
    Please click on the button below to continue!</p>
    <div class="text-center mb-5">    <ButtonContainer class="sm-3">
    <Link to="/New" className="nav-link text-white mx-2">Add item</Link>
    </ButtonContainer>
    </div>

  <h1 class="text-center text-info text-italic">Check Inventory</h1>
    <p class="text-center text-dark text-weight-bold">Have a clear conscience view of your inventory inorder to update whenever required!</p>
    <div class="text-center mb-5">  <ButtonContainer>
    <Link to="/Inventory" className="nav-link text-white mx-2">Check Inventory</Link>
    </ButtonContainer>
    </div>
    </div>
    <div>
  <h1 class="text-center text-warning text-weighted-bold">New Sale</h1>
    <p class="text-center text-light">Has a product been purchased?? Click on the button below to fill in the customer details and track their sales</p>
    <div class="text-center mb-5">
    <ButtonContainer>
    <Link to="/salesform" className="nav-link text-white mx-2">Add sales</Link>
    </ButtonContainer>
    </div>
  <h1 class="text-center text-primary text-weighted-bold">Track sales</h1>
    <p class="text-center text-light">Track the sales made, past and ongoing! View, track and filter sales based on name of the product, date and price.</p>
    <div class="text-center">
    <ButtonContainer>
    <Link to="/Salestracking" className="nav-link text-white mx-2">Track</Link>
    </ButtonContainer>
    </div>
</div>
</div>
</div>
</ProductWrapper>
        )
        }
}
const ProductWrapper=styled.div`
.bg{
  background-image: url("https://mdbootstrap.com/img/Photos/Horizontal/Nature/full page/img(20).jpg");
  
  height: 100%;

  /* Center and scale the image nicely */

}
`
