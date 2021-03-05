import { Router, Request, Response } from 'express'
import {User, IUser} from '../model/User'
import { Session } from '../model/Session'
import { isAuthencated } from '../authMiddleware';
var uuid = require('node-uuid')

var router = Router();

router.post('/signup', function(req: Request, res: Response){
    console.log('signup headers', req.body)

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function(err, createdUser){
        if(err) {
            return res.status(401).send(err)
        }
        res.send(createdUser)
    })
    // res.status(404).send("sorry this is not found")
    // res.send(req.body)
});

router.post('/signin', function(req, res){
    User.findOne({
        email: req.body.email
    }, function(err, foundUser){
        if(err){
            return res.status(401).send(err || 'error sigining in')
        }
        if(foundUser.password !== req.body.password){
            return res.status(403).send({message: 'email or password incorrect'}) 
        }
        Session.create({user: foundUser._id, sid: uuid.v1()}, function(err, createdSession){
            console.log('===================1')
            if(err || !createdSession) {
                return res.status(401).send(err || "error creating session")
            }
            return res.send({token: createdSession.sid})
        })
    })
});

// domain : dummy domain
// user id: email of the user
// password : password for the user
router.post('/login', function(req, res){
    User.findOne({
        email: req.body.user
    }, function(err, foundUser){
        if(err){
            return res.status(401).send(err || 'error sigining in')
        }
        if(foundUser.password !== req.body.password){
            return res.status(403).send({message: 'email or password incorrect'}) 
        }
        Session.create({user: foundUser._id, sid: uuid.v1()}, function(err, createdSession){
            console.log('===================1')
            if(err || !createdSession) {
                return res.status(401).send(err || "error creating session")
            }
            return res.send({token: createdSession.sid})
        })
    })
});

// isAuthenticated - first handler 
// next : function - second handler
// This route, first calls the first handler 'isAuthenicated'.  
// 1. If user is authenicated, the handler returns next() which means to execute/call the 
// second handler 
// 2. If the authenicaton fails, the route returns error message.
router.get('/me', isAuthencated, function(req, res){
    User.findById({_id: req.user._id}, function(err, foundUser){
        if(err || !foundUser){
            res.status(403).send({message: "Error finding the user"})
        }
        res.send(foundUser);
    })
})

export default router;
