var uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let cardSchema = new Schema({
    cardId: {
        type: Number, 
    },
    cardCode: {
        type: Number, 
        },

    balance: {
        type: Number, 
        },  
    email: {
        type: String, 

    },

});

module.exports = mongoose.model('Card', cardSchema);