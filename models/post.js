const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define the schema for Post model
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'public'
    },

    description: {
        type: String,
        required: true
    },

    creationDate: {
        type: Date,
        default: Date.now,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],

    allowComments: {
        type: Boolean,
        default: false
    }
})

// Returns a date in 'yyyy-MM-dd' format
postSchema.methods.formatDate = function(datePropery) {
    const newDate = new Date(this[dateProperty]);
    let formattedDate = `${ newDate.getFullYear() }-`;
        formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }-`;  // for double digit month
        formattedDate += `${ `0${ newDate.getDate() }`.slice(-2) }`;        // for double digit day
    return formattedDate;
}  
// tried using this in my getPosts page as {{this.formatDate()}} but it did not work because the object passed to this route is not a mongoose object but a plain JS object.


// define the post model
const Post = mongoose.model('Post', postSchema)

// export the model
module.exports = {
    Post
}