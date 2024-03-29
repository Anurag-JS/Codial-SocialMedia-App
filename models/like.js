const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId
    },
    // This Define the objectId of the liked object
    likeable : {
        type : mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    // This Define the type of the liked object, Since this is a dynamic reference
    onModel : {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
},{
    timestamps : true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;