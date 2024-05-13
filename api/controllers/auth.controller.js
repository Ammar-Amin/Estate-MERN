import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    // console.log(req.body)
    const { username, email, password } = req.body

    const hashPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashPassword })
    try {
        await newUser.save()
        res.status(200).send('User created successfully')
    } catch (err) {
        res.status(500).json(err.message)
    }
}