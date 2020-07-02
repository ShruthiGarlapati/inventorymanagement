module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Shekom202412",
    DB: "inventorymanagement",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };