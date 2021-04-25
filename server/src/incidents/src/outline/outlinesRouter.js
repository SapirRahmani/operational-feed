import { Router } from "express";
import outlinesController from "./outlinesController";

const outlinesRouter = Router();

outlinesRouter.get("/", outlinesController.getAllOutlines);

export default outlinesRouter;
