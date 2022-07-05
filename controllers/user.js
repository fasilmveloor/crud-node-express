const UserModel = require('../models/user');

//create and save user
exports.create = async (req, res) => {
    if(!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        return res.status(400).send({
            message: 'Fields cannot be empty'
        });
    }
    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    await user.save().then(data => {
        res.send({
            message: 'User created successfully',
            user: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the user'
        });
    });
};

//Retrieve all users from the database
exports.findAll = async (req, res) => {
    try{
        const users = await UserModel.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(404).json({
            message: err.message || 'Some error occurred while retrieving users'
        });
    }
};

//Retrieve a single user from the database
exports.findOne = async (req, res) => {
    try{
        const user = await UserModel.findById(req.params.id);
        if(!user) {
            return res.status(404).send({
                message: 'User not found with id ' + req.params.id
            });
        }
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({
            message: err.message || 'Some error occurred while retrieving user'
        });
    }
};

//Update a user in the database
exports.update = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: 'Data to update cannot be empty'
        });
    }
    const id = req.params.id;
    await UserModel.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false}).then(data => {
            if(!data) {
                return res.status(404).send({
                    message: 'User not found with id ' + id
                });
            }
            res.send({
                message: 'User updated successfully'
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while updating user'
            });
        });
};

//Delete a user with specified id from the database
exports.delete = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if(!data) {
            return res.status(404).send({
                message: 'User not found with id ' + req.params.id
            });
        }
        res.send({
            message: 'User deleted successfully'
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Some error occurred while deleting user'
        });
    })
};