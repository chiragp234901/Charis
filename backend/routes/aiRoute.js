import express from "express";
import {
    testAI,
    getRecommendations
} from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.get("/test", testAI);

aiRouter.post("/recommend", getRecommendations);

export default aiRouter;