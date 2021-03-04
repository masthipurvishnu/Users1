import express = require('express')
import bodyParser = require('body-parser')
// import the sagger lib
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');

var app = express();
// *********************** swagger definition *********************** 

/* Swagger files start */
let swaggerFile: any = "/Users/vv_home/citi/Users1/api/swagger/swagger.json";
let swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
// let customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
let swaggerDocument = JSON.parse(swaggerData);
/* Swagger files end */

import authRoutes from './routes/authRoutes'
import { authMiddleware } from './authMiddleware';

app.use(function (req, res, next){
    // console.log('headers', req.headers)
    next();
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(authMiddleware)
app.use('/api/auth', authRoutes)
// / swagger docs
app.use('/api/docs', swaggerUi.serve,
                    swaggerUi.setup(swaggerDocument, null, null)
        );

app.get('/test', function(req, res) {
    res.send({message:"test api successfully called VV"})
})

export default app;

// var swaggerJSDoc = require('swagger-jsdoc');
// var swaggerDocument = JSON.parse(this.swaggerData);
// var swaggerDefinition = {
//     info: {
//       title: 'Node Swagger API VV',
//       version: '1.0.0',
//       description: 'Demonstrating how to describe a RESTful API with Swagger - VV',
//     },
//     host: 'localhost:1337',
//     basePath: '/',
//   };
  
//   // options for the swagger docs
//   var options = {
//     // import swaggerDefinitions
//     swaggerDefinition: swaggerDefinition,
//     // path to the API docs
//     // apis: ['./routes/*.js'],
//     apis: ['./routes/authRoutes.ts'],
//   };

//   // initialize swagger-jsdoc
//   var swaggerSpec = swaggerJSDoc(options);
// *********************** swagger definition *********************** 
// serve swagger
// app.get('api/swagger/swagger.json', function(req, res) {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
//   });
  