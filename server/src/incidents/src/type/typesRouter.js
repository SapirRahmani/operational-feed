import { Router } from "express";
import typesController from "./typesController";

const typesRouter = Router();

typesRouter.get("/", typesController.getAllTypes);

export default typesRouter;
