const db = require("../models");
const inventories = db.inventory;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.Productname) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
  

const newitem = {
    Productname: req.body.Productname,
    Serialno: req.body.Serialno,
    Quantity: req.body.Quantity,
    Price: req.body.Price,
    Name: req.body.Name
  };

  // Save Tutorial in the database
  inventories.create(newitem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the data."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const Productname = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    inventories.findAll({ where: condition })
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
exports.findOne = (req, res) => {  const id = req.params.id;

    inventories.findByPk(id)
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
exports.update = (req, res) => {
    const id = req.params.id;

    inventories.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "It was updated successfully."
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
        inventories.destroy({
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
    inventories.destroy({
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
        inventories.findAll({ where: { published: true } })
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
