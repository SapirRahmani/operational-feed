import { Router } from "express";
import IncidentsController from "./incidentsController";
import incidentsController from "./incidentsController";

const incidentsRouter = Router();

incidentsRouter.post("/", IncidentsController.addIncident);

incidentsRouter.post("/unlike", IncidentsController.unlikeIncident);

incidentsRouter.post("/like", IncidentsController.likeIncident);

incidentsRouter.get(
  "/feed/:userPersonalNumber",
  incidentsController.getSuggestedIncidents
);

export default incidentsRouter;
