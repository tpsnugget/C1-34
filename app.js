var express = require("express"),
   mongoose = require("mongoose"),
   passport = require("passport"),
   bodyParser = require("body-parser"),
   User = require("./models/user"),
   localStrategy = require("passport-local"),
   passportLocalMongoose = require("passport-local-mongoose")

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true
}

mongoose.connect("mongodb://localhost:27017/auth_demo_app", options)

var app = express()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require("express-session")({
   secret: "Rusty is the best and cutest dog in the world",
   resave: false,
   saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//==============================================================================
//    ROUTES
//==============================================================================
app.get("/", (req, res) => {
   res.render("home")
})

app.get("/secret", isLoggedIn, (req, res) => {
   res.render("secret")
})

// Show signup form
app.get("/register", (req, res) => {
   res.render("register")
})

// Handles user signup
app.post("/register", (req, res) => {
   User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
      if (err) {
         console.log(err)
         return res.render("register")
      }
      passport.authenticate("local")(req, res, () => {
         res.redirect("/secret")
      })
   })
})

// LOGIN ROUTE, renders login FORM
app.get("/login", (req, res) => {
   res.render("login")
})

// LOGIN Logic
app.post("/login", passport.authenticate("local", {
   successRedirect: "/secret",
   failureRedirect: "/login"
}), (req, res) => {

})

app.get("/logout", (req, res) => {
   req.logout()
   res.redirect("/")
})

function isLoggedIn(req, res, next) {
   if (req.isAuthenticated()) {
      return next()
   }
   res.redirect("/login")
}
//==============================================================================
//    ROUTES
//==============================================================================

app.listen(3000, process.env.IP, () => {
   console.log("The Authentication Server is running...")
})