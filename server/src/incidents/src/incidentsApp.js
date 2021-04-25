import "dotenv/config";
import "core-js/stable";
import "regenerator-runtime";
import express from "express";
import bodyParser from "body-parser";
import { expressMiddleware } from "./db/database";
import incidentsRouter from "./incident/incidentsRouter";
import destinationsRouter from "./destination/destinationsRouter";
import outlinesRouter from "./outline/outlinesRouter";
import resultsRouter from "./result/resultsRouter";
import typesRouter from "./type/typesRouter";
import unitsRouter from "./unit/unitsRouter";
import userRouter from "./user/userRouter";

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

const errorHandlingMiddleware = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
};

const app = express();

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(errorHandlingMiddleware);
app.use(expressMiddleware);

app.use("/api/incidents", incidentsRouter);
app.use("/api/results", resultsRouter);
app.use("/api/types", typesRouter);
app.use("/api/units", unitsRouter);
app.use("/api/users", userRouter);
app.use("/api/outlines", outlinesRouter);
app.use("/api/destinations", destinationsRouter);

export default app;
