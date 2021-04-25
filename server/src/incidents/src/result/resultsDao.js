const createNewResult = (name) => `CREATE (:Result{
    name: "${name}"
  })`;

const connectIncidentToResult = (
  incident,
  resultName
) => `MATCH (incidentResult: Result {name: "${resultName}"})
  CREATE (${incident})-[:Result]->(incidentResult)`;

const getAllResultsQuery = () => `MATCH (results:Result) RETURN results.name AS name`;

export default {
  createNewResult,
  connectIncidentToResult,
  getAllResultsQuery
};
