import { Session } from './model/Session'
import {Request, Response} from 'express'

export function authMiddleware(req:Request, res:Response, next:Function) {
    Session.findOne({sid: req.header('Authorization')})
            .populate('user')
            .exec(function(err, foundSession){
                if(foundSession) {
                    req.user = foundSession.user
                    req['isAuthenticated'] = true;
                    console.log("Authorization-Signed-in User- ", foundSession.user)
                    return next()
                } else {
                    req['isAuthencated'] = false;
                    req.user = null;
                    console.log("Authorization-User not found - foundSession - ", foundSession)
                    return next()
                }
            })
}

export function authMiddleware_1(req:Request, res:Response, next:Function) {
    Session.findOne({sid: req.body.token})
            .populate('user')
            .exec(function(err, foundSession){
                if(foundSession) {
                    req.user = foundSession.user
                    req['isAuthenticated'] = true;
                    console.log("authMiddleware_1 Authorization-Signed-in User- ", foundSession.user)
                    return next()
                } else {
                    req['isAuthencated'] = false;
                    req.user = null;
                    console.log("authMiddleware_1 Authorization-User not found - foundSession - ", foundSession)
                    return next()
                }
            })
}

export function isAuthencated(req:Request, res:Response, next: Function) {
    if(req['isAuthenticated'] === true && req.user._id) {
        return next();
    } else {
        console.log(401)
        return res.status(401).send({message: "Authentication required."})
    }
}
