const Listing = require("../models/listing.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  return res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  return res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const list = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!list) {
    req.flash("error", "List doesn't exist");
    return res.redirect("/listing");
  }

  return res.render("./listings/show.ejs", { list });
};

module.exports.createListing = async (req, res) => {
  try {
    const location = req.body.listing.location;

    const apiKey = "dd43d109323847739b3fc8f338ea4290";
    const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      location
    )}&key=${apiKey}`;

    let lat = null;
    let lng = null;
    let formattedLocation = location;

    try {
      const geoRes = await fetch(geocodeURL);
      const geoData = await geoRes.json();

      if (geoData.results && geoData.results.length > 0) {
        lat = geoData.results[0].geometry.lat;
        lng = geoData.results[0].geometry.lng;
        formattedLocation = geoData.results[0].formatted;
      }
    } catch (e) {
      console.log("Geocoding failed, saving without map");
    }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    newListing.location = formattedLocation;

    // Always give valid geometry
    if (lat && lng) {
      newListing.geometry = {
        type: "Point",
        coordinates: [lng, lat],
      };
    } else {
      // Default India center
      newListing.geometry = {
        type: "Point",
        coordinates: [78.9629, 20.5937],
      };
    }

    newListing.category = req.body.listing.category;

    await newListing.save();

    req.flash("success", "New listing created");
    return res.redirect("/listing");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong");
    return res.redirect("/listing/new");
  }
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const data = await Listing.findById(id);

  if (!data) {
    req.flash("error", "List doesn't exist");
    return res.redirect("/listing");
  }

  let originalImageUrl = data.image ? data.image.url : null;
  if (originalImageUrl) {
    originalImageUrl = originalImageUrl.replace("upload", "upload/w_250,h_300");
  }

  return res.render("./listings/update.ejs", { data, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const location = req.body.listing.location;

  const apiKey = "dd43d109323847739b3fc8f338ea4290";
  const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    location
  )}&key=${apiKey}`;

  let lat = null;
  let lng = null;

  try {
    const geoRes = await fetch(geocodeURL);
    const geoData = await geoRes.json();
    if (geoData.results && geoData.results.length > 0) {
      lat = geoData.results[0].geometry.lat;
      lng = geoData.results[0].geometry.lng;
    }
  } catch (e) {}

  let updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (lat && lng) {
    updatedListing.geometry = {
      type: "Point",
      coordinates: [lng, lat],
    };
  }

  if (req.file) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  updatedListing.category = req.body.listing.category;
  await updatedListing.save();

  req.flash("success", "Listing updated");
  return res.redirect("/listing");
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  const deleted = await Listing.findByIdAndDelete(id);

  if (!deleted) throw new ExpressError(404, "Listing not found");

  req.flash("success", "Listing deleted");
  return res.redirect("/listing");
};

module.exports.filterListing = async (req, res) => {
  const name = req.params.category;

  if (name === "All") {
    return res.redirect("/listing");
  }

  const allListings = await Listing.find({ category: name });
  return res.render("listings/index", { allListings });
};

module.exports.searchListing = async (req, res) => {
  let query = decodeURIComponent(req.params.category);
  console.log(query);

  // exact match (case-sensitive)
  const allListings = await Listing.find({
    title: { $regex: `^${query}$`, $options: "i" }
  });



  if (allListings.length === 0) {
    req.flash("error", "No hotels found");
    return res.redirect("/listing");
  }

  res.render("listings/index", { allListings });
};

