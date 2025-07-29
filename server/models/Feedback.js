import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            // required: true,
        },
        email: {
            type : String,
            // required : true,
        },
        message: {
            type: String,
            // required: true,
        },
        rating: {
            type: Number,
            max: 5,
            min: 1,
            default: 5, 
        },
    }, 
    // {
    //     timestamps: true,
    // }
);

const Feedback = mongoose.model("FeedBack ", feedbackSchema);

export default Feedback;

