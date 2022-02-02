const { Schema, model } = require('mongoose');


const taskSchema = new Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true
    },
    state: {
        type: String,
        default: 'active'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Task', taskSchema);