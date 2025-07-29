import Feedback from "../models/Feedback.js";

//POST //api/feedback

export const submitFeedback = async (req , res) => {
    try{
        let {
            name,
            email,
            message,
            rating

        }
        = req.body;

        if( !name || !email || !message ){
            return res.status(400).json({ message: "Please fill all the details"});
        }

        const feedback = await Feedback.create({name, email, message, rating});
        res.status(201).json(feedback);

    }
    catch(error){
        res.status(500).json({ message : error.message});
    }
}

//GET /api/feeback

export const getAllFeedback = async (req , res) => {
    try{
        const feedbackList = await Feedback.find().sort({createdAt: -1});
        res.status(200).json({feedbackList});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

