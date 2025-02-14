
// Require the module
// Need:  'npm install swagger-ui-express'
// Need:  'npm install swagger-ui-autogen' -- has vulnerabilities
// Need:  'node swagger.js' to generate the swagger.json file
const swaggerAutogen = require('swagger-autogen')(); 

const doc = {
    info: {
        title: "Users API",
        description: "users API",
    },
    host: "cse-341-project1-bddt.onrender.com",
    schemes: ['https']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate the swagger.json file
swaggerAutogen(outputfile, endpointsFiles, doc);