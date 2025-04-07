const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  let list = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  list.reviews.push(newReview);
  newReview.author = req.user._id;
  await newReview.save();
  await list.save();
  req.flash("success", "New Review Added");
  res.redirect(`/listing/${list.id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listing/${id}`);
};
