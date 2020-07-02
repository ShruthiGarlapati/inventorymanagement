import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
//import {ProductConsumer} from '../Server/Context';
import PropTypes from 'prop-types';
import ManagementService from '../services/inventoryservice';
class Product extends Component {
    constructor(props){
        super(props);
   // this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    //this.refreshList = this.refreshList.bind(this);
    //this.setActiveTutorial = this.setActiveTutorial.bind(this);
   // this.removeAllTutorials = this.removeAllTutorials.bind(this);
   // this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
   componentDidMount(){
       this.retrieveTutorials();
   }
  /* onChangeSearchTitle(){
       const searchTitle= e.target.value;
     this.setState({
           searchTitle: searchTitle
   });
}*/
   retrieveTutorials() {
    ManagementService.getAll()
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
  
  /*searchTitle() {
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
  }*/
    render() {
        
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;
      // const{id, title, img, price, inCart} = this.props.product;
        return (
            <ProductWrapper className=" col-9 mx-auto col-md-6 col-lg-3 my-3">   
            <div className="card">
                <div className="img-container p-5" onClick={()=>console.log("you clicked")}>
                    <Link to="/Details">
                        Product
                    </Link>

                </div>
                {tutorials && tutorials.map((tutorial, index)=>(
                     <div className="card-footer d-flex justify-content-between">
                     <p className="align-self-center mb-0">
                         <p className={"list-group-item"+ (index==currentIndex? "active":"") }
                         onClick={()=>this.setActiveTutorial(tutorial, index)}>
                             {tutorial.Productname}
                         </p> 
                     </p>
                     <p className="align-self-center mb-0">$
                         {tutorial.Price}
                     </p>
                 </div>  
                ))}
                 </div>  
                 </ProductWrapper>
                
        );
    }
}
/*Product.propTypes={
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string


    })
}*/

const ProductWrapper=styled.div`
.card{
    border-color: grey;
    transition: all 1s linear;
    border-style: inset;
}
.card-footer
{
    background: lightblue;
    border-top: transparent;
    transition: all 1s linear;
}
&:hover
{
    .card{
        border: 0.04rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background: rgba(247,247,247)
    }
}
`
export default Product;