const UserModel = require('../models/userModel');

const UserController = {};

UserController.create = (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        phone: req.body.phone
    };

    UserModel.create(userData, (err, result) => {
        if (err) {
            return res.status(500).json({success: false, message: err.message});
        }
        return res.status(200).json({success: true, message: 'User created successfully', data: result});
    });
};

module.exports = UserController;