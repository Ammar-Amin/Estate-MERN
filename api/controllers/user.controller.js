import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import mongoose from "mongoose";
import Listing from "../models/listing.model.js";
export const test = (req, res) => {
    res.json({
        status: 200,
        route: 'API Working',
        message: 'Welcome my friend',
        sender: 'test@example.com',
    })
}

export const allUsers = async (req, res, next) => {
    try {
        let allUsers = await User.find();
        res.status(200).json(allUsers)
    } catch (err) {
        next(err);
    }
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own Password'))

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, { new: true })

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account'))

    try {
        await User.findByIdAndDelete(req.user.id);
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted')
    } catch (error) {
        next(error)
    }
}

export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            let listings = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listings);
        } catch (err) {
            next(err)
        }
    } else {
        next(errorHandler(401, 'You can only view your own listing.'));
    }
}

export const getUser = async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params.id)) return next(errorHandler(401, "User Id is not valid"))
    try {
        let user = await User.findById(req.params.id)

        if (!user) return next(errorHandler(404, "User not found!"))

        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
}