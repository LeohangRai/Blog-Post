const Post = require('../models/post').Post
const { Category } = require('../models/category')

module.exports = {
    adminHome: (req, res) => {
        res.render('admin/index')
    },

    getPosts: (req, res) => {
        Post.find()
            .populate('category') //populates the referenced objectId with the object having that id on Cateogory model
            .lean()
            .then(posts => {
                res.render('admin/posts/index', {posts})
            })
    },

    postForm: (req, res) => {
        //passing the categories so that we can show them as options in the create-post form
        Category.find()
            .sort({'title': 'asc'})
            .lean()
            .then(categories => {
                console.log(categories)
                res.render('admin/posts/postForm', {categories})
            })        
    },

    submitPosts: (req, res) => {
        //Check if the allowComments checkbox is ON or OFF
        const allowComments = req.body.allowComments? true: false;
        
        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.content,
            allowComments: allowComments,
            category: req.body.category  //will be passed as id
        })
        newPost.save()
            .then(post => {
                console.log(post)
                req.flash('success-message', 'Post created successfully!')
                res.redirect('/admin/posts')   
            })
            
    },   

    editPostForm: (req, res) => {
        const id = req.params.id;

        Post.findById(id).lean()
            .then(post => {
                // pass all the categories so that we can render them in our edit post form select field.
                Category.find().lean()
                    .then(categories => {
                        res.render('admin/posts/edit', {post, categories})
                    })                
            })
    },


    editPostSubmit: (req, res) => {
        const id = req.params.id;
        const allowComments = req.body.allowComments? true: false;

        const updatedPostData = {
            title: req.body.title,
            status: req.body.status,
            category: req.body.category,
            allowComments,
            description: req.body.content,          
        }

        Post.findByIdAndUpdate(id, updatedPostData) 
            .then(post => {
                req.flash('success-message', `The post "${post.title}" has been updated.`)
                res.redirect('/admin/posts')
            })
            .catch(err => {
                console.log(err);
            })
        
    },

    deletePost: (req, res) => {
        const id = req.params.id;

        Post.findByIdAndDelete(id)
            .then(deletedPost => {
                req.flash('success-message', `The post with the title ${deletedPost.title} has been deleted.`)
                res.redirect('/admin/posts')
            })
    },

    getCategories: (req, res) => {
        Category.find().lean()
            .then(categories => {
                res.render('admin/category/index', {categories: categories})
            })
    },
    
    createCategory: (req, res) => {
        const newCategoryTitle = req.body.categoryTitle;
        if(newCategoryTitle) {
            //Check if there's already a category of the given title
            Category.findOne({title: newCategoryTitle})
                .then(match => {
                    if (match) {
                        console.log('Match is found')
                        res.json({
                            error: true, 
                            errorMsg: "This category is already available."
                        })
                    }
                    else {
                        const newCategory = new Category({
                            title: newCategoryTitle
                        })
                        newCategory.save()
                            .then(newCat => {
                                res.status(200).json({
                                    error: false,
                                    errorMsg: null,
                                    newCategory: newCat                                    
                                })
                            })
                    }
                })
        }
    },

    editCategorySubmit: (req, res) => {
        const id = req.params.id
        const newTitle = req.body.title
        
        const updateData = {
            title: newTitle
        }
        console.log('Edit category submit route hit.');


        Category.findByIdAndUpdate(id, updateData)
            .then(category => {
                req.flash('success-message', `The category "${category.title}" has been updated.`)
                res.status(200).json({
                    error: false,
                    errorMsg: null,
                    updatedCategor: category                                    
                })
            })
            .catch(err => {
                console.log(err);
            })
    },

    deleteCategory: (req, res) => {
        const id = req.params.id

        Category.findByIdAndDelete(id)
            .then(deletedCategory => {
                req.flash('success-message', `The Category "${deletedCategory.title}" was deleted successfully.`)
                res.redirect('/admin/category')
            })
    }
}