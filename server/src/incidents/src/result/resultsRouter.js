import { Router } from "express";
import resultsController from "./resultsController";

const resultsRouter = Router();

resultsRouter.get("/", resultsController.getAllResults);

export default resultsRouter;
