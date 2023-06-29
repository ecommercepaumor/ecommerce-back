const User = require("../../models/User")

const user = async() => {

    const userCreate = {
        firstName: "andrea",
        lastName: "delgado",
        email: "paumor271@hotmail.com",
        password: "1234",
        phone: "123456789"
    }

    await User.create(userCreate)
}

module.exports = user