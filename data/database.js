const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
let database;

const initDB = (callback) => {
    if (database) {
        console.log('Database is already connected');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;;
            console.log('Database connected');
            return callback(null, database);
        })
        .catch((err) => {
            console.log('Error connecting to database');
            return callback(err);
        });   
};

const getDatabase = () => {
    try {
            if (!database) {
                throw new Error('Database is not connected');
            }
            return database;
        } catch (error) {
            console.log('Error getting database', error);
        }   
    }

module.exports = {
    initDB,
    getDatabase     
};