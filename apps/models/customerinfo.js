
module.exports=(sequelize, Sequelize)=>{
    const customerinfo=sequelize.define("cust",
    {
     Customername:{
        type:Sequelize.STRING
      },
      CustomerAdress:{
         type: Sequelize.STRING
      },
      Currentdate: {
        type: Sequelize.DATE
      },
      pding: {
        type: Sequelize.STRING
      },
      Serialno: {
        type: Sequelize.STRING
      },
      Quantity: {
        type: Sequelize.INTEGER
      },
      Price: {
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      productid: {
        type: Sequelize.STRING,
        references:{
          model: 'tutorials',
          key: 'Serialno'
        }
        },
     
    }); 
    
  customerinfo.associate = function(models) {
    customerinfo.hasMany(models.newproduct, {as: 'Serialno'})
  };
    return customerinfo;
  };
