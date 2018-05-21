let express = require('express');
let router = express.Router();
let db = require('../db/mongo')


/* Get home page */
router.post('/login', function(req, res) {
    if(!req.body.uName || !req.body.password){
        res.send({error:'missing fields in request'})
        return
    }
    else {
        //Check if user  exists
        db.users.findOne({uName:req.body.uName})
        .then(o=>{
            // username exists
            if(o) {
                if(o.password === req.body.password){
                    return o
                }
                else {
                    return {error:'invalid user name or password'}
                }
            }
            //user not found
            else {
               return {error:'account not found signup now'}
                
            }
        })
        .then(o=>{
            res.send(o)
            return o
        })
        .catch(e=>{
            console.log(e)
            res.send({error:'internall server error'})
        })
    }
});

module.exports = router;