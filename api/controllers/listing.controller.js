import { mongoose } from "mongoose";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json(listing)
    } catch (err) {
        next(err);
    }
}

export const deleteListing = async (req, res, next) => {

    const listing = await Listing.findById(req.params.id)

    if (!listing) {
        return next(errorHandler(404, "Listing not found"))
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only delete your own listings!"));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("Listing deleted successfully")
    } catch (err) {
        next(err);
    }
}

export const updateListing = async (req, res, next) => {

    if (!mongoose.isValidObjectId(req.params.id)) return next(errorHandler(401, "id not valid"))
    let listing = await Listing.findById(req.params.id)

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"))
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only update your own listing"));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (err) {
        next(err);
    }
}

export const getListing = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) return next(errorHandler(401, "id not valid"))

    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, "Listing not found"));

    try {
        res.status(200).json(listing);
    } catch (err) {
        next(err);
    }

}