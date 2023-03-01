const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require('moment')

const eventSchema = new mongoose.Schema({
    sportName: {
        type: String,
        required: true,
        trim: true
    },
    
    userId: {
        type: ObjectId,
        trim: true,
        required: true,
        ref: 'users'
    },
    
    eventTime: {
        type: String,
        trim: true,
        default: moment().format('YYYY-MM-DD')
    },
    address: {
        'street': {
            type: String,
            trim: true
        },
        'city': {
            type: String
            , trim: true
        },
        'pincode': {
            type: String,
            trim: true
        }
    }
},
    { timestamps: true }
);
module.exports = mongoose.model('event', eventSchema)