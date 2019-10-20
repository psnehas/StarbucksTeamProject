var express = require('express');
var router = express.Router();
var Card = require('../models/cardSchema')
var User = require('../models/userSchema')
// A route for a registered user to log in
router.post('/addCard',function (req, res) {
    User.findOne({'email':req.body.email},(err,user)=>{
        if(err)
        {
            res.writeHead(500,{
                'Content-type' : 'text/plain'
            })
            res.end('Unable to fetch user details '+err)
        }
    
        //if user exists,insert cardid into the cards array
        else if(user)
        {
            console.log("user retrieved is"+user)

            if(user.authenticated)
            {
            //check the length of card id and card code
                        if(req.body.cardId.toString().length!=9||req.body.cardCode.toString().length!=3)
                        {
                            res.writeHead(403,{
                                'Content-type' : 'text/plain'
                            })
                            res.end('Cardid should be 9 digits long')
                        }
                        //if card already exists,send an error
                        if(user.card && user.card.includes(req.body.cardId))
                        {
                            res.writeHead(400,{
                                'Content-type' : 'text/plain'
                            })
                            res.end('Card already exists '+user)
                        }
                        //if card does not exist,push the new card
                        else
                        {               
                            user.card.push(req.body.cardId)
                            user.save()
                            .then( response=>{
                                var cardItem =new Card ({
                                    cardId : req.body.cardId,
                                    cardCode : req.body.cardCode,
                                    balance : '20',
                                    email :req.body.email
                                })
                        
                                cardItem.save()
                                .then(response=> {
                                res.writeHead(201,{'Content-Type': 'text/plain'});
                                res.end('created a card Successfully')
                                
                                })
                                .catch(err=>{
                                    res.writeHead(404,{
                                        'Content-type' : 'text/plain'
                                    })
                                    res.end('Unable to add a card '+err)               
                                })}
                                )
                        }
            }
            else
            {
                res.writeHead(406,{
                    'Content-type' : 'text/plain'
                })
                res.end('Please log in')  
            }
           
        }
        //create an account
        else
        {
    
                    res.writeHead(401,{
                        'Content-type' : 'text/plain'
                    })
                    res.end('Please Create an account')               
            

        }
       
   })
   
 })
 module.exports = router;