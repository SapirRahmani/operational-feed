const createNewOutline = (name) => `CREATE (:Outline{
    name: "${name}"
  })`;

const connectIncidentToOutline = (
  incident,
  outlineName
) => `MATCH (incidentOutline: Outline {name: "${outlineName}"})
  CREATE (${incident})-[:Outline]->(incidentOutline)`;

const getAllOutlinesQuery = () => `MATCH (outlines:Outline) RETURN outlines.name AS name`;

export default {
  createNewOutline,
  connectIncidentToOutline,
  getAllOutlinesQuery
};
