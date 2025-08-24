import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

router.post("/login", async(req, res) => {
    try{
        const {email,password} = req.body;
        //checking if the user exits
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User Not Found."});
        }

        //verifying password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        //creating a jwt token
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(200).json({message: "Login Successfully", token, 
            user: {
                id: user._id,
                useremail: user.email,
            },
        });
    } catch(err){
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }


})

export default router;