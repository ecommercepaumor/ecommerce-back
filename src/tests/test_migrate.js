const sequelize = require('../utils/connection');
const user = require('./createData/user');
require("../models");

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await user()
        console.log('Pauli 🙏🏻 Me Ejecute 😎')
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();