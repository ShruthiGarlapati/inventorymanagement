import React, { Component } from 'react'  
import Table from '@material-ui/core/Table';  
import TableBody from '@material-ui/core/TableBody';  
import TableCell from '@material-ui/core/TableCell';  
import TableContainer from '@material-ui/core/TableContainer';  
import TableHead from '@material-ui/core/TableHead';  
import TableRow from '@material-ui/core/TableRow';  
import Paper from '@material-ui/core/Paper';  
import axios from 'axios';  
import jsPDF from 'jspdf';  
import Button from '@material-ui/core/Button'; 
 import '../App.css';  
import html2canvas from 'html2canvas';  
import ManagementService from '../services/inventoryservice';
export class Invoicepdf extends Component {  
 constructor(props) {  
    super(props)  
    this.state = {  
      tutorials: []  

    }  
  }  
  printDocument() {  
    const input = document.getElementById('pdf');  
    html2canvas(input)  
      .then((canvas) => {  
        var imgWidth = 200;  
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 0;  
        var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
        pdf.save("download.pdf");  
      });  
  }  

  componentDidMount() {  
    axios.get('http://localhost:8080/api/tutorials/customer').then(response => {  
      console.log(response.data);  
      this.setState({  
        tutorials: response.data  
      });  
    });  
    this.retrieveTutorials();
  }
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
    
     
  render() {  
    return (  
      <div>  
          <TableContainer id="pdf" className="txt" component={Paper}>  
          <Table stickyHeader aria-label="sticky table">  
            <TableHead>  
              <TableRow>    
                <TableCell align="right">Name</TableCell>  
                <TableCell align="right">Quantity</TableCell>  
                <TableCell align="right">Price</TableCell>  
                <TableCell align="right">Serialno</TableCell>    
              </TableRow>  
            </TableHead>  
            <TableBody>  
              {  
                this.state.tutorials.map((p, index) => {  
                  return <TableRow key={index}>  
                    <TableCell component="th" scope="row">  
                                           {p.Productname}  
                    </TableCell>  
                    <TableCell align="right">{p.Quantity}</TableCell>  
                    <TableCell align="right">{p.Price}</TableCell>  
                    <TableCell align="right">{p.Serialno}</TableCell>    
                  </TableRow>  
                })              }  
            </TableBody>  
          </Table><br></br>
      
          <Button onClick={this.printDocument} variant="contained" color="primary">  
                         Generate pdf
                                </Button>  
                                </TableContainer>
      </div>  
      

    );
  }
} 
  

export default Invoicepdf
