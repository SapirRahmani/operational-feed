import { Router } from "express";
import destinationsController from "./destinationsController";

const destinationsRouter = Router();

destinationsRouter.get("/", destinationsController.getAllDestinations);

export default destinationsRouter;
