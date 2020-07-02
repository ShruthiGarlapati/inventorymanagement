module.exports = (sequelize, Sequelize) => {
    const newproduct = sequelize.define("tutorial", {
      Productname: {
        type: Sequelize.STRING
      },
      Serialno: {
        type: Sequelize.STRING
      },
      Quantity:{
          type: Sequelize.INTEGER
      },
       Price: {
           type: Sequelize.INTEGER
       },
      Name: {
        type: Sequelize.STRING
      }
    });
  
    return newproduct;
  };