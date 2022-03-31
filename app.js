const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const { mongoDbUrl, PORT, globalVariables } = require('./config/configuraton')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const { selectOption } = require('./config/customHelpers')

const app = express();

// paths for express config
const publicDirectoryPath = path.join(__dirname, 'public')


// setup static directory to serve
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(publicDirectoryPath))

// handlebars view engine setup
app.engine('handlebars', exphbs.engine({
    //configure default layout to be "layouts/default.handlebars"
    defaultLayout: 'default',
    // register custom helpers
    helpers: {
        select: selectOption
    }
})) 

app.set('view engine', 'handlebars')

// method-override
app.use(methodOverride('_method'))

// flash and sessions
app.use(session({
    secret: 'mysecret',
    saveUninitialized: true, //saves the session even if there is no modification
    resave: true
}));

app.use(flash());

app.use(globalVariables)



// mongoose connection to DB
mongoose.connect(mongoDbUrl, { useNewUrlParser: true})
.then((response) => {
    console.log('DB connected successfully!')
}).catch((err) => {
    console.log('DB connection failed.')
})


// routes
const defaultRoutes = require('./routes/default_routes')
const adminRoutes = require('./routes/admin_routes')

app.use('/', defaultRoutes)
app.use('/admin', adminRoutes)



app.listen(PORT, () => {
    console.log("Server up and running at Port: 3000")
})