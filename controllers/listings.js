
const Listing = require("../models/listing.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ExpressError  = require("../utils/ExpressError.js");

// const geocodingClient = mbxGeocoding({ accessToken: mapToken });
 


module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  if (allListings.length === 0)
    throw new ExpressError(404, "No Listings Found!");
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  let list = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!list) {
    req.flash("error", "List doesn't exits");
    res.redirect("/listing");
  }
  if (!list) throw new ExpressError(404, "Listing Not Found!");
  res.render("./listings/show.ejs", { list });
};



module.exports.createListing = async (req, res) => {
  const location = req.body.listing.location;
  console.log("📍 Location from form:", location);

  const apiKey = 'dd43d109323847739b3fc8f338ea4290';
  const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

  try {
    const geoRes = await fetch(geocodeURL);
    const geoData = await geoRes.json();

    console.log("🌍 Geocoding Response:", JSON.stringify(geoData, null, 2));

    if (!geoData.results || geoData.results.length === 0) {
      console.log("⚠️ No results from geocoding API.");
      req.flash("error", "Location not found");
      return res.redirect("/listing/new");
    }

    const { lat, lng } = geoData.results[0].geometry;
    console.log("📌 Coordinates:", lat, lng);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    } else {
      console.log("⚠️ No file uploaded");
    }

    newListing.location = geoData.results[0].formatted;

    newListing.geometry = {
      type: "Point",
      coordinates: [lng, lat],
    };
    newListing.category = req.body.listing.category;
    console.log(newListing);

    const saved = await newListing.save();
    console.log("✅ New listing saved:", saved);

    req.flash("success", "New List Created");
    res.redirect("/listing");
  } catch (err) {
    console.error("❌ Error in createListing:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/listing/new");
  }
};



module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id);
  if (!data) {
    req.flash("error", "List doesn't exits");
    res.redirect("/listing");
  }
  let orignalImageUrl = data.image ? data.image.url : null;
  if (orignalImageUrl) {
    orignalImageUrl = orignalImageUrl.replace(
      "upload",
      "upload/w_250,h_300"
    );
  }
  res.render("./listings/update.ejs", { data, orignalImageUrl });
};



module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const location = req.body.listing.location;
  const apiKey = 'dd43d109323847739b3fc8f338ea4290';
  const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

  const geoRes = await fetch(geocodeURL);
  const geoData = await geoRes.json();

  const { lat, lng } = geoData.results[0].geometry;

  let updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (!updatedListing) throw new ExpressError(404, "Listing Not Found!");

  // Update geometry (location coordinates)
  updatedListing.geometry = {
    type: "Point",
    coordinates: [lng, lat],
  };

  // Update image if a new file was uploaded
  if (req.file) {
    updatedListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  updatedListing.category = req.body.listing.category;
  console.log(updatedListing);

  await updatedListing.save();

  req.flash("success", "List Updated");
  res.redirect("/listing");
};




module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) throw new ExpressError(404, "Listing Not Found!");
  req.flash("success", "List Deleted!");
  res.redirect("/listing");
};

module.exports.filterListing = async (req, res) => {
  const name = req.params.category; // e.g., "Rooms"
  console.log("Category:", name); // Debug
  if(name==="All"){
    res.redirect("/listing");
  }

  const allListings = await Listing.find({ category:name}); // Not "Category" as a string
  console.log(allListings);
  res.render("listings/index", { allListings });
};

module.exports.searchListing = async (req, res) => {
  const name = req.params.category; // e.g., "Rooms"
  console.log("Category:", name); // Debug
  if(name==="All"){
    res.redirect("/listing");
  }

  const allListings = await Listing.find({ category:name}); // Not "Category" as a string
  if(allListings.length==0){
    req.flash("error","No Hotels found");
    res.redirect("/listing");
  }
  console.log(allListings);
  res.render("listings/index", { allListings });
};

