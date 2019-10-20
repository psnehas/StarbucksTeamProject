var express = require('express');
var router = express.Router();

var orders =require('../models/orderSchema');
var users  =require('../models/userSchema');
var cards =require('../models/cardSchema');

router.route('/orders').post( function (req, res) {

users.findOne({email:req.body.email},{email:1,_id:0,authenticated:1,card:1},function (error,result) {
    if (error) {
        res.status(403).json("error in finding user!");
    
    } else {
    if(result){
     if(!result.authenticated)
      {
        res.status(400).json("User not authenticated to place order"); 
      }
      else{
         if(result.card.includes(req.body.cardno))
         {var price="1.5"
         if(req.body.milk==="no")
         var price=parseFloat(req.body.qty)*(1.5);
         if(req.body.milk==="yes")
         var price=parseFloat(req.body.qty)*(2.5);
            console.log(req.body.cardno)
            orders.create( {email:req.body.email,
                cardno: req.body.cardno,
                qty: req.body.qty,
                item: req.body.item,
                milk:req.body.milk, 
                price: parseFloat(price), 
                status:"rejected"
            }, function (error,result) {
                    if (error) {
                      console.log(error.message)
                      res.status(400).json("Can't place order sorry!");
                    
                    } else {
                    
                    console.log(result)
                    res.status(200).json("order placed successfully");
                    }
                    })
         }
         else
         {
            res.status(400).json("Card not found!Use other card to place order");      
         }

      }
    }
    else{
        res.status(400).json("User not found");
    }
    }
})

});

router.route('/orders').get( function (req, res) {
    

    orders.find( {email:req.query.email}, function (error,result) {
            if (error) {
              console.log(error,"error")
          
              res.status(400).json("Unable to get orders!");
            } else {
            
                if(JSON.stringify(result)==="[]")
                  {
                    res.status(404).json('Orders for this User Not found');
                  }
                  else{
                    res.status(200).json(JSON.stringify(result)); 
                  }
            }
            })
    });

    router.route('/healthcheck').get( function (req, res) {
    

  
                        res.status(200).json("I am healthy"); 
               
        });


module.exports = router;