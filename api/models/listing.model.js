import mongoose, { Schema } from "mongoose";


const listingSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            required: true,
        },
        bedroom: {
            type: Number,
            required: true,
        },
        hall: {
            type: Number,
            required: true,
        },
        kitchen: {
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        offer: {
            type: Boolean,
            required: true,
        },
        imageUrls: {
            type: Array,
            require: true
        },
        userRef: {
            type: String,
            require: true
        }
    }, { timestamps: true }
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;