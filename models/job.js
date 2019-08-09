const mongoose = require(`mongoose`);

const JobSchema = new mongoose.Schema({
    title: {                
        type: String,
        required: true      
    },               
    position: {
        type: String,
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Employer`,
        required: true
    },    
    location: {
        type: String,
        required: true
    },        
    status: {
        type: String,
        enum: [`ACTIVE`, `DUE`],
        default: `ACTIVE`
    },
}, {
    timestamps: true          
});

JobSchema.query.active = function() {
    return this.where({status: `ACTIVE`});
};

JobSchema.query.due = function() {
    return this.where({status: `DUE`});
};


module.exports = mongoose.model(`Job`, JobSchema);


