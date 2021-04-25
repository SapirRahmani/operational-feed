// Require Neo4j
import neo4j from "neo4j-driver";

// Create Driver
const driver = new neo4j.driver(
  `neo4j://${process.env.DB_URL}`,
  neo4j.auth.basic(`${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`)
);

export const getNewSession = () => driver.session();
export const closeDriverConnection = () => driver.close();

// Express middleware
export const expressMiddleware = (req, res, next) => {
  req.driver = driver;

  next();
};
