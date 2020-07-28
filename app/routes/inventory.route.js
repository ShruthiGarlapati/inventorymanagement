module.exports= app => {
    const tutorials = require("../controllers/inventory.controller.js");
    const custs=require("../controllers/inventory.controller.js");
   // const cust= require("../controllers/inventory.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.createProduct);
    router.post("/customer", tutorials.createCustomer );
  
    // Retrieve all inventory
    router.get("/", tutorials.findAllProds);
    router.get("/customer", tutorials.findAllSales);
    
    // Retrieve all published inventory
    //router.get("/published", inventory.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:Productname", tutorials.findOne);
    router.get("/customer:Currentdate", tutorials.findDate);
  
    // Update a Tutorial with id
    //router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };
