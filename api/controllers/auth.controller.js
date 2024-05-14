import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    // console.log(req.body)
    const { username, email, password } = req.body

    const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashPassword })
    try {
        await newUser.save()
        res.status(200).json('User created successfully')
    } catch (err) {
        // res.status(500).json(err.message)
        next(err);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found :('));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        // const { password: pass, ...rest } = validUser;
        const { password: pass, ...rest } = validUser._doc; // return everything except password

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest)
    } catch (err) {
        next(err);
    }
}