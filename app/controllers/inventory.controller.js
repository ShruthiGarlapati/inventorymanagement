const db = require("../models");
const { sequelize } = require("../models");
const { Router } = require("express");
//const { sequelize } = require("../models");
const newproduct= db.tutorials;
const customerinfo=db.custs;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createProduct = (req, res) => {
  // Validate request
  if (!req.body.Productname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    Productname: req.body.Productname,
    Serialno: req.body.Serialno,
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    Name: req.body.Name,
     };

  // Save Tutorial in the database
  newproduct.upsert(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });

};

exports.createCustomer= (req,res)=>
{
  if (!req.body.Customername) {
    res.status(400).write({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const cust = {
    Customername: req.body.Customername,
    CustomerAdress: req.body.Adress,
    Currentdate: req.body.Date,
    pding: req.body.pding,
    Serialno: req.body.Serialno,
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    Name: req.body.Name
   // //Price: req.body.Price,
   // Name: req.body.Name,
     };
  // Save Tutorial in the database
  customerinfo.create(cust)
    
  .then(data => {
   res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  }); 
  
  /*  newproduct.create(cust)
    .then(data => {
     res.write(res.statusCode.toString(data))
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });*/
   
    
   


};
// Retrieve all Tutorials from the database.
exports.findAllProds = (req, res) => {
    const Productname = req.query.Productname;
    var condition = Productname ? { Productname: { [Op.like]: `%${Productname}%` } } : null;
  
    newproduct.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving."
        });
      });
  };

  exports.findAllSales = (req, res) => {
    const Customername= req.query.Customername;
    var condition = Customername ? { Customername: { [Op.like]: `%${Customername}%` } } : null;
  
    customerinfo.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {  
  const Productname = req.params.Productname;

  newproduct.findByPk(Productname)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving with id=" + id
        });
      });
  };

  exports.findDate = (req, res) => {  
    const Currentdate = req.params.Currentdate;
  
    customerinfo.findByPk(Currentdate)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving with id=" + id
          });
        });
    };
  

// Update a Tutorial by the id in the request
exports.updateProds = (req, res) => {
    const Productname = req.params.Productname;

    newproduct.update(req.body, {
      where: { Productname: Productname }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            
          });
        } else {
          res.send({
            message: `Cannot update with id=${id}. Maybe it was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
        const id = req.params.id;
        newproduct.destroy({
          where: { id: id }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Tutorial was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Tutorial with id=" + id
            });
          });
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  newproduct.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  newproduct.findAll({ where: { published: true } })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
          });
  
};
