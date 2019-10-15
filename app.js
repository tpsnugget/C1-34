var   express = require("express"),
      mongoose = require("mongoose")

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true
}

mongoose.connect("mongodb://localhost:27017/auth_demo_app", options)

var app = express()
app.set("view engine", "ejs")

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