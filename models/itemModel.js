const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    location: {
        type: String, 
        required: true
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
module.exports = mongoose.model('Item', ItemSchema);