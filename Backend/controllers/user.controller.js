const userModel = require('../models/user.model');



const register = async (req, res, next) => {
  try {

    const data = {
        name: 'Nikhil Goswami',
        email: 'nikhil.goswami.18121999@gmail.com',
        password: 'nikhil@goswami'
    }

    await userModel.create(data);

    res.send({
        success: true,
        message: 'You are registered successfully'
    })
    
  } catch (error) {

    console.log(error);
    
  }
};

const login = (req, res, next) => {
    res.send({
        success: true,
        message: "this is login api"
    });
};

const logout = (req, res, next) => {
    res.send({
        success: true,
        message: "this is logout api"
    });
};


module.exports = {register, login, logout}


