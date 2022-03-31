const express = require('express')
const router = express.Router()

// import the defaultController which has functions to call for default routes
const defaultControllers = require('../controllers/defaultControllers')

// use this layout for all default routes
// middleware
router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'default';
    next();
})

// adding routes to the router
router.route('/')
    .get(defaultControllers.home)

router.route('/login')
    .post(defaultControllers.loginSubmit)

router.route('/register')
    .post(defaultControllers.registerSubmit)


// export the router    
module.exports = router;