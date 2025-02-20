const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author", }, })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing does not exist!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }

  module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = req.body.listing;
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = {filename , url };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }

  module.exports.renderEditForm = async (req, res) => {
       let { id } = req.params;
       const oldListing = await Listing.findById(id);
       if (!oldListing) {
         req.flash("error", "Listing does not exist!");
         res.redirect("/listings");
       }
       let originalImageUrl = oldListing.image.url;
       originalImageUrl = originalImageUrl.replace("/upload" , "/upload/h_250,w_250");
       res.render("listings/edit.ejs", { oldListing , originalImageUrl});
     }

     module.exports.updateListing = async (req, res) => {
      // if(!req.body.listing){
      //   throw new ExpressError(400, "Send valid data for listing")
      // }
      let { id } = req.params;
      let updatedData = { ...req.body.listing };
      let listing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });

      if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {filename , url };
        await listing.save();
      }
      req.flash("success", "Listing Updated!");
      res.redirect(`/listings/${id}`);
    }

    module.exports.destroyListing= async (req, res) => {
      let { id } = req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("success", "Listing Deleted!");
      res.redirect("/listings");
    }