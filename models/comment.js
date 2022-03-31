const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    date: {
        type: Date,
        default: Date.now
    },

    approvedStatus: {
        type: Boolean,
        default: false
    }

})

const Comment = mongoose.model('Comment', commentSchema)


module.exports = {
    Comment: Comment
}