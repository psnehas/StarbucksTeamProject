var express = require('express');
var router = express.Router();

var User = require('../models/userSchema');

/**
 * A route for user registration
 * Request body required fields: email, 4  digit pin
 */
router.post('/user', function (req, res) {
  User.create(req.body)
    .then(function(dbUser) {
      // If saved successfully, send the the new User document to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

router.delete('/user/:email', function (req, res) {
  User.findOneAndRemove({ email : String(req.params.email)}, function(err) {
    if (err) {throw err;}
    else {
      res.json({'deleted' : true});
    }
  })
})

/**
 * A route to get user profile.
 * Uses email as unique key
 */
router.get('/user/:email', function (req, res) {
  // Find user document by email
  User.findOne({ _id: String(req.params.email)}, function(err, data) {
    if (err) {throw err;}
    else {
      // Exclude pin from response
      let id    = data._id
      let email = data.email
      let auth  = data.authenticated
      // Exclude undefined values
      let phone = (data.phone != undefined) ? data.phone : "No Phone On File"
      // Send response
      res.json({'id': id, 'email': email, 'phone': phone, 'authenticated': auth});
    }
  })
});

/**
 * A route for updating the pin.
 * Requires that res.email && res.pin match an existing User document.
 * De-authenticates the user and updates pin to res.newPin
 */
router.post('/user/pin', function(req, res) {
  User.findOneAndUpdate({email: req.body.email, pin: req.body.pin},
                         {$set:{authenticated: false, pin: req.body.newPin}},
                         {upsert: false},
    (err, doc) => {
      if (err){throw err;}
      console.log(doc);
      res.json({'doc': doc, 'Pin Updated' : true})
    });
});

/**
 * A route for setting authentication flag in User document
 * Looks for document with email and pin field matching the request body
 */
router.post('/user/authenticate', function(req, res) {
  User.findOneAndUpdate({email: req.body.email, pin: req.body.pin},
                         {$set:{authenticated: true}},
                         {upsert: false},
    (err, doc) => {
      if (err){throw err;}
      console.log(doc);
      res.json({'doc': doc, 'User Authentiated' : true})
    });
});

/**
 * A route for setting authentication flag in User document
 * Requires email field in request body, finds matching document
 * and sets authenticated = false
 */
router.post('/user/logout', function(req, res) {
  User.findOneAndUpdate({email: req.body.email},
                         {$set:{authenticated: false}},
                         {upsert: false},
    (err, doc) => {
      if (err){throw err;}
      console.log(doc);
      res.json({'doc': doc, 'User Logged Out' : true})
    });
});

module.exports = router;
