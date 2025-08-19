import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Auth.js';

const router = express.Router();


router.post("/signup", async (req , res) => {
    try{
        const {name, email, password} = req.body;


        // checking if the user is existing
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        //hashing and salting password using bcrypt

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,

        });

        await newUser.save();

        res.status(201).json({message: "User registered Successfully"});

    } catch(err){
        console.error(err.message);
        res.status(500).json({message: "Internal Server Error"})
    }
});

export default router;