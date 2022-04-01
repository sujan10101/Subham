const Mongoose = require('mongoose');


const equipmentSchema = new Mongoose.Schema({
    equipmentName: {
        type: String,
        required: true,
    },
    image: {
        type:String,
        required: false,
    },
    type:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    }
}) 


const Equipment = Mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;