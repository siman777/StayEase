
require('dotenv').config();
console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const MongoStore = require('connect-mongo');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute=require("./routes/user.js");

const dbUrl=process.env.ATLASDB_URL;

const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("Error in Mongo Session Store");
})


app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
 


app.use(flash());
//configure Passport.js
app.use(passport.initialize()); // Enables Passport.js middleware
app.use(passport.session()); // Enables session-based authentication
//use static authanticate for local strategy
passport.use(new LocalStrategy(User.authenticate()));
// Serialize user data into session
passport.serializeUser(User.serializeUser());
// Deserialize user from session
passport.deserializeUser(User.deserializeUser());



// Connect to MongoDB
main()
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})

//means that the review router (or middleware)
// will handle all requests that match the route pattern "/listing/".
app.use("/listing", listingRoute);
//means that the review router (or middleware) will handle all requests
// that match the route pattern "/listing/:id/reviews".
app.use("/listing/:id/reviews", reviewRoute);


app.get("/", (req, res) => {
  res.redirect("/listing");
});



app.use("/",userRoute);





// Handle invalid routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});



// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("./listings/error.ejs", { message });
});

// Start server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
