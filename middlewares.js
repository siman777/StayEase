const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./Schema.js");
const review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.originalUrl);
    if (!req.isAuthenticated()) {
      req.session.redirectUrl=req.originalUrl;
      req.flash("error", "You must be Login in first!");
      return res.redirect("/login");
    }
    next();
  };
  

module.exports.saveRedirecturl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
}  


module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let list = await Listing.findById(id);

  if (!list) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listing");
  }

  if (!list.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing.");
    return res.redirect(`/listing/${id}`);
  }
  
  next();
};

// Middleware for validating listing data
module.exports.validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  if (error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
  }else {
      next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id,reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this listing.");
    return res.redirect(`/listing/${id}`);
  }
  
  next();
};
