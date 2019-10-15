var   express                 = require("express"),
      mongoose                = require("mongoose"),
      passport                = require("passport"),
      bodyParser              = require("body-parser"),
      User                    = require("./models/user"),
      localStrategy           = require("passport-local"),
      passportLocalMongoose   = require("passport-local-mongoose")

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true
}

mongoose.connect("mongodb://localhost:27017/auth_demo_app", options)

var app = express()
app.set("view engine", "ejs")

app.use(require("express-session")({
   secret: "Rusty is the best and cutest dog in the world",
   resave: false,
   saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//==============================================================================
//    ROUTES
//==============================================================================
app.get("/", (req, res) => {
   res.render("home")
})

app.get("/secret", (req, res) => {
   res.render("secret")
})
//==============================================================================
//    ROUTES
//==============================================================================

app.listen(3000, process.env.IP, () => {
   console.log("The Authentication Server is running...")
})