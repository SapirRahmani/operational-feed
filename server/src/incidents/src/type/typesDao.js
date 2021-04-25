const createNewType = (name) => `CREATE (:Type{
    name: "${name}"
  })`;

const connectIncidentToType = (
  incident,
  typeName
) => `MATCH (incidentType: Type {name: "${typeName}"})
  CREATE (${incident})-[:Type]->(incidentType)`;

const getAllTypesQuery = () => `MATCH (types:Type) RETURN types.name AS name`;

export default {
  createNewType,
  connectIncidentToType,
  getAllTypesQuery
};
