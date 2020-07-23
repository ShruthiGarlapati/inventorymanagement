import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./Components/Nav";
import Productlist from "./Components/Productlist";
import {Switch, Route} from 'react-router-dom';
import  NewItemTab from './Components/NewItemTab';
import Invoice from './Components/Invoice';
import SalesTracking from './Components/SalesTracking';
import Salesform from './Components/Salesform';
import { ButtonContainer } from './Components/ButtonContainer';
import AddTutorial from './Components/tuts';
import Product from './Components/Product';
import TutorialsList from './Components/invent';
import home from './Components/home';
//import Salesform from './Components/salesform1';

class App extends Component
{ 
  render(){
  return (
    <React.Fragment>
    <Nav></Nav>
    <Switch>
    <Route exact path ="/" component= {home}/>
    <Route  path="/New" component={NewItemTab}/>
    <Route path="/salesform" component={Salesform} />
    <Route path="/Inventory" component={TutorialsList} />
    <Route path="/Salestracking" component={SalesTracking} />
    <Route path="/Invoicepage" component={Invoice} />
    </Switch>
   
</React.Fragment>

  );
}
}
export default App;