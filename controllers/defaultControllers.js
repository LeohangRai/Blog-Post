const { Post } = require('../models/post')
const { Category } = require('../models/category')

module.exports = {
    // function for '/' route
    home: async (req, res) => {
        const posts = await Post.find().lean()
        const categories = await Category.find().lean()
        res.render('default/index', { posts, categories})
    }, 

    // for '/login' route 
    loginSubmit: (req, res) => {
        res.send('You have successfully logged in.')
    },

    // for '/register' route
    registerSubmit: (req, res) => {
        res.send('Your account has been registered.')
    }
}