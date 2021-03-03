import { Session } from './model/Session'
import {Request, Response} from 'express'

export function authMiddleware(req:Request, res:Response, next:Function) {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&")
    Session.findOne({sid: req.header('Authorization')})
            .populate('user')
            .exec(function(err, foundSession){
                if(foundSession) {
                    req.user = foundSession.user
                    req['isAuthenticated'] = true;
                    console.log("&&&&&&&&&&&&&&&&&&&&&&&& 1 - ", foundSession.user)
                    return next()
                } else {
                    req['isAuthencated'] = false;
                    req.user = null;
                    console.log("&&&&&&&&&&&&&&&&&&&&&&&& 1 - null", foundSession)
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
