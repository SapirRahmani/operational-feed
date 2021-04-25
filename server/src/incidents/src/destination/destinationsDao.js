const createNewDestination = (name) =>
  `CREATE (:Destination{
        name: "${name}"
      })`;

const connectIncidentToDestination = (
  incident,
  destinationName
) => `MATCH (incidentDestination: Destination {name: "${destinationName}"})
  CREATE (${incident})-[:Occured]->(incidentDestination)`;

const getAllDestinationsQuery = () => `MATCH (destinations:Destination) RETURN destinations.name AS name`;

export default {
  createNewDestination,
  connectIncidentToDestination,
  getAllDestinationsQuery
};
