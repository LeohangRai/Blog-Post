const express = require('express')
const adminControllers = require('../controllers/adminControllers')
const router = express.Router()

// use this layout for all admin routes "/admin/*"
// middleware
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'admin';
    next(); 
})

router.route('/')
    .get(adminControllers.adminHome)

router.route('/posts')
    .get(adminControllers.getPosts)
    

router.route('/posts/create')
    .get(adminControllers.postForm)
    .post(adminControllers.submitPosts)


router.route('/posts/edit/:id')
    .get(adminControllers.editPostForm)
    .put(adminControllers.editPostSubmit)


router.route('/posts/delete/:id')
    .delete(adminControllers.deletePost)
    


// Category routes
router.route('/category')
    .get(adminControllers.getCategories)
    .post(adminControllers.createCategory)

// Edit category
router.route('/category/edit/:id')
    .put(adminControllers.editCategorySubmit)


// Delete category
router.route('/category/delete/:id')
    .delete(adminControllers.deleteCategory)

module.exports = router