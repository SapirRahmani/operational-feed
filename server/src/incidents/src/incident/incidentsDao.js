import typesDao from "../type/typesDao";
import resultsDao from "../result/resultsDao";
import outlinesDao from "../outline/outlinesDao";
import destinationsDao from "../destination/destinationsDao";
import divisionsDao from "../unit/unitsDao";

const addIncident = (
  incidentDbName,
  locationDescription,
  date
) => `CREATE (${incidentDbName}: Incident {
  locationDescription: "${locationDescription}",
  date: "${date}"
})`;

const createNewIncident = (
  locationDescription,
  date,
  divisionName,
  brigadeName,
  battalionName,
  companyName,
  destinationName,
  outlineName,
  resultName,
  typeName
) => {
  const incidentDbName = "incident";
  return `
${addIncident(incidentDbName, locationDescription, date)} 
WITH ${incidentDbName} 
${divisionsDao.connectIncident(
    incidentDbName,
    divisionName,
    brigadeName,
    battalionName,
    companyName
  )} 
WITH ${incidentDbName} 
${destinationsDao.connectIncidentToDestination(
    incidentDbName,
    destinationName
  )} 
WITH ${incidentDbName} 
${outlinesDao.connectIncidentToOutline(incidentDbName, outlineName)} 
WITH ${incidentDbName} 
${resultsDao.connectIncidentToResult(incidentDbName, resultName)} 
WITH ${incidentDbName} 
${typesDao.connectIncidentToType(incidentDbName, typeName)}
`;
};

const likeIncident = (
  personalNumber,
  incidentId
) => `MATCH (u:User),(i:Incident)
WHERE u.personalNumber = '${personalNumber}' AND id(i) = ${incidentId}
CREATE (u)-[r:LIKES]->(i)`;

const getRelatedNodesToIncident = (incidentNodeName, relatedNodesName) =>
  `OPTIONAL MATCH (${incidentNodeName})-[:Division|:Brigade|:Battalion|:Company|:Type|:Outline|:Result|:Occured]->(${relatedNodesName})`;

const getIncidentInformation = (
  connectedIncidentVariableName,
  divisionVariableName,
  brigadeVariableName,
  battalionVariableName,
  companyVariableName,
  typeVariableName,
  outlineVariableName,
  resultVariableName,
  destinationVariableName
) =>
  `MATCH (${connectedIncidentVariableName})-[:Division]->(${divisionVariableName}: Division), (${connectedIncidentVariableName})-[:Brigade]->(${brigadeVariableName}: Brigade),
(${connectedIncidentVariableName})-[:Battalion]->(${battalionVariableName}: Battalion), (${connectedIncidentVariableName})-[:Company]->(${companyVariableName}: Company),
(${connectedIncidentVariableName})-[:Type]->(${typeVariableName}: Type), (${connectedIncidentVariableName})-[:Outline]->(${outlineVariableName}: Outline),
(${connectedIncidentVariableName})-[:Result]->(${resultVariableName}: Result), (${connectedIncidentVariableName})-[:Occured]->(${destinationVariableName}: Destination)`;

const getMostRelatedBasedOnInterests = (
  userPersonalId,
  connectedIncidentVariableName,
  relateRatingFieldName
) => {
  return `MATCH (ourUser: User{personalNumber: "${userPersonalId}"})-[:INTERESTED_IN]-(connectedInterestingFields)<--(${connectedIncidentVariableName})
  with ourUser,${connectedIncidentVariableName}, COUNT(DISTINCT connectedInterestingFields.name) as numberOfConnectedInterestingFields
  MATCH (${connectedIncidentVariableName})-->(allIncidentRelatedFields)
  with ourUser,${connectedIncidentVariableName}, COLLECT(DISTINCT allIncidentRelatedFields.name) as allIncidentRelatedFields, numberOfConnectedInterestingFields
  MATCH (ourUser)-[:INTERESTED_IN]->(allInterestingFields)
  with ourUser,${connectedIncidentVariableName}, allIncidentRelatedFields, numberOfConnectedInterestingFields, COLLECT(DISTINCT allInterestingFields.name) as allInterestingFieldsList
  with ${connectedIncidentVariableName}, numberOfConnectedInterestingFields,allIncidentRelatedFields+[x IN allInterestingFieldsList WHERE NOT x IN allIncidentRelatedFields] AS allRelatedNodes
  with ${connectedIncidentVariableName}, ((1.0 * numberOfConnectedInterestingFields)/SIZE(allRelatedNodes)) as ${relateRatingFieldName}`;
};

const getMostSimillarToLikedIncidents = (
  userPersonalId,
  connectedIncidentVariableName,
  jaccardRatingFieldName,
  concatedFieldName,
) => {
  const likedIncidentVariableName = "likedIncident";
  const connectedIncidentInformationVariableName = "otherIncidentInformation";
  const likedIncidentInformationVariableName = "likedIncidentInformation";

  return `OPTIONAL MATCH (ourUser: User{personalNumber: "${userPersonalId}"})-[:LIKES]->(${likedIncidentVariableName}: Incident),
  (${likedIncidentVariableName})-[:Division|:Brigade|:Battalion|:Company|:Type|:Outline|:Result|:Occured]->(connectors)<-[:Division|:Brigade|:Battalion|:Company|:Type|:Outline|:Result|:Occured]-(${connectedIncidentVariableName})
  WHERE NOT (ourUser)-[:LIKES]->(${connectedIncidentVariableName})
  WITH ${likedIncidentVariableName}, ${connectedIncidentVariableName}, COUNT(DISTINCT connectors.name) AS intersection, ${concatedFieldName}
  ${getRelatedNodesToIncident(
    connectedIncidentVariableName,
    connectedIncidentInformationVariableName
  )}
  WITH ${likedIncidentVariableName}, ${connectedIncidentVariableName}, intersection, COLLECT(DISTINCT ${connectedIncidentInformationVariableName}.name) AS otherIncidentRelatedNodes, ${concatedFieldName}
  ${getRelatedNodesToIncident(
    likedIncidentVariableName,
    likedIncidentInformationVariableName
  )}
  WITH ${likedIncidentVariableName}, ${connectedIncidentVariableName}, intersection, otherIncidentRelatedNodes, COLLECT(DISTINCT ${likedIncidentInformationVariableName}.name) AS likedIncidentRelatedNodes, ${concatedFieldName}
  WITH ${connectedIncidentVariableName}, intersection, likedIncidentRelatedNodes+[x IN otherIncidentRelatedNodes WHERE NOT x IN likedIncidentRelatedNodes] AS allRelatedNodes, ${concatedFieldName}
  WITH ${connectedIncidentVariableName}, CASE SIZE(allRelatedNodes) WHEN 0 THEN 0 ELSE ((1.0 * intersection)/SIZE(allRelatedNodes)) END AS ${jaccardRatingFieldName}, ${concatedFieldName}`;
};

const getFeedIncidents = (userPersonalId) => {
  const feedIncidentsVariableName = "feedIncidents";
  const relateRatingFieldName = "relateRating";
  const jaccardRatingFieldName = "jaccardRating";
  const connectedDivisionVariableName = "feedIncidentsDivision";
  const connectedBrigadeVariableName = "feedIncidentsBrigade";
  const connectedBattalionVariableName = "feedIncidentsBattalion";
  const connectedCompanyVariableName = "feedIncidentsCompany";
  const connectedTypeVariableName = "feedIncidentsType";
  const connectedOutlineVariableName = "feedIncidentsOutline";
  const connectedResultVariableName = "feedIncidentsResult";
  const connectedDestinationVariableName = "feedIncidentsDestination";

  return `MATCH (${feedIncidentsVariableName}: Incident)
  ${getMostRelatedBasedOnInterests(
    userPersonalId,
    feedIncidentsVariableName,
    relateRatingFieldName
  )}
  ${getMostSimillarToLikedIncidents(
    userPersonalId,
    feedIncidentsVariableName,
    jaccardRatingFieldName,
    relateRatingFieldName
  )}
  ${getIncidentInformation(
    feedIncidentsVariableName,
    connectedDivisionVariableName,
    connectedBrigadeVariableName,
    connectedBattalionVariableName,
    connectedCompanyVariableName,
    connectedTypeVariableName,
    connectedOutlineVariableName,
    connectedResultVariableName,
    connectedDestinationVariableName
  )}
  WITH ${feedIncidentsVariableName}.date AS date, ${feedIncidentsVariableName}.locationDescription AS locationDescription,
  ${connectedTypeVariableName}.name AS type, ${connectedOutlineVariableName}.name AS outline,
  ${connectedResultVariableName}.name AS result, ${connectedDivisionVariableName}.name AS division, ${connectedBrigadeVariableName}.name AS brigade,
  ${connectedBattalionVariableName}.name AS battalion, ${connectedCompanyVariableName}.name AS company,
  ${connectedDestinationVariableName}.name AS destination, ((${jaccardRatingFieldName} * 0.75) + (${relateRatingFieldName} * 0.25)) AS rating
  RETURN date, locationDescription, type, outline, result, division, brigade, battalion, company, destination, rating ORDER BY rating DESC, date DESC`;
};

const unlikeIncident = (
  personalNumber,
  incidentId
) => `MATCH (u:User),(i:Incident)
WHERE u.personalNumber = '${personalNumber}' AND id(i) = ${incidentId}
MATCH (u)-[r:LIKES]->(i)
DELETE r`;

export default {
  createNewIncident,
  likeIncident,
  getFeedIncidents,
  unlikeIncident,
};
