const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users'] 
    try {
        const response = await mongodb.getDatabase().db().collection('users').find();
        response.toArray().then((users) => { 
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(users));
        }); 
    } catch (error) {
        res.status(500).send('Error getting users', error);    
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users'] 
    try {
        const userID = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').find({ _id: userID });
        response.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(users));
        });
    } catch (error) {
        res.status(500).send('Error getting user', error);
    }
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users'] 
    try {
        const user =  {
            Email: req.body.email,
            Username: req.body.Username,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Job: req.body.Job,
            Status: req.body.Status,
            Country: req.body.Country
        };
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);

        if (response.acknowledged) {
            res.status(201).send();
        } else {
            res.status(500).JSON(response.error || 'Error creating user');
        };
    } catch (error) {
        res.status(500).send('Error creating user', error);
    }

};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users'] 
    try {
        const userID = new ObjectId(req.params.id);
        const user = {
        Email: req.body.email,
        Username: req.body.Username,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Job: req.body.Job,
        Status: req.body.Status,
        Country: req.body.Country
        };

        const response = await mongodb.getDatabase().db().collection('users').updateOne({ _id: userID}, { $set: user });
        res.setHeader('Content-Type', 'application/json');
        if (response.modifiedCount === 0) {
            res.status(500).send('Error updating user');
        }
        else {
            res.status(200).send(JSON.stringify(response));
        };
    } catch (error) {
        res.status(500).send('Error updating user', error);
    }
    
};


const deleteUser = async (req, res) => { 
    //#swagger.tags = ['Users']  
    try {
        const userID = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userID });
        res.setHeader('Content-Type', 'application/json');
        if (response.deletedCount === 0) {
            res.status(500).send('Error deleting user');
        }
        else {
            res.status(200).send(JSON.stringify(response));
        };
    } catch (error) {
        res.status(500).send('Error deleting user', error);
    }   
   
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};