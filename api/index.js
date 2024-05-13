import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
dotenv.config()

const app = express();

mongoose
    .connect(process.env.MONGO)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

app.listen(3000, () => {
    console.log('listening on port : 3000')
})

app.use('/api/user', userRouter)