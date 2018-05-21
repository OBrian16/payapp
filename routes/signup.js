let express = require('express');
let router = express.Router();
let db = require('../db/mongo')


/* Get home page */
router.post('/signup', function(req, res) {
    if(!req.body.fName || !req.body.lName || !req.body.uName|| !req.body.email|| !req.body.password){
        res.send({error:'missing fields in request'})
        return
    }
    else {
        //Check is username is taken
        db.users.findOne({uName:req.body.uName})
        .then(o=>{
            // username exists
            if(o) {
                res.send({error:`username ${req.body.uName} is taken`})
                return {error:`username ${req.body.uName} is taken`}
            }
            //username not taken
            else {
               return db.users.insertOne(req.body)
                
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