import express from "express";

//api from feedbackController
import { submitFeedback , getAllFeedback } from "../controllers/feedbackController.js";


const router = express.Router();

router.post("/", submitFeedback);
router.get("/", getAllFeedback);

export default router;
