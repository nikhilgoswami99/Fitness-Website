const userModel = require('../models/user.model');


const register = async (req, res, next) => {
  try {

    await userModel.create(req.body);

    res.send({
        success: true,
        message: 'You are registered successfully'
    })
    
  } catch (error) {

    res.status(409).send({
            success: false,
        message: 'User with this email already exists'
    });

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


