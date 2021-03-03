import express = require('express')
import bodyParser = require('body-parser')

var app = express();
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

app.get('/test', function(req, res) {
    res.send("test successfully called")
})

export default app;