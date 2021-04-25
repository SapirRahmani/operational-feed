const createDivisionObject = (name, brigades) => ({
  name,
  brigades,
  getCreateQuery: function (divisionIndex) {
    const divisionDbName = `division${divisionIndex}`;
    return `CREATE (${divisionDbName}:Division{name:"${this.name}"})
          ${this.brigades
        .map((brigade, index) =>
          brigade.getCreateQuery(divisionDbName, index)
        )
        .join(" ")}`;
  },
});

const createBrigadeObject = (name, battalions) => ({
  name,
  battalions,
  getCreateQuery: function (divisionContainedIn, brigadeIndex) {
    const brigadeDbName = `${divisionContainedIn}brigade${brigadeIndex}`;
    return `CREATE (${brigadeDbName}:Brigade{name:"${this.name}"})
           ${this.battalions
        .map((battalion, index) =>
          battalion.getCreateQuery(brigadeDbName, index)
        )
        .join(" ")}
           CREATE (${divisionContainedIn})<-[:CONTAINED]-(${brigadeDbName})`;
  },
});

const createBattalionObject = (name, companies) => ({
  name,
  companies,
  getCreateQuery: function (brigadeContainedIn, battalionIndex) {
    const battalionDbName = `${brigadeContainedIn}battalion${battalionIndex}`;
    return `CREATE (${battalionDbName}: Battalion{name:"${this.name}"})
                  ${this.companies
        .map((company, index) =>
          company.getCreateQuery(battalionDbName, index)
        )
        .join(" ")}
                  CREATE (${brigadeContainedIn})<-[:CONTAINED]-(${battalionDbName})`;
  },
});

const createCompanyObject = (name) => ({
  name,
  getCreateQuery: function (battalionContainedIn, companyIndex) {
    const companyDbName = `${battalionContainedIn}company${companyIndex}`;
    return `CREATE (${companyDbName}: Company{name:"${this.name}"})
                    CREATE (${battalionContainedIn})<-[:CONTAINED]-(${companyDbName})`;
  },
});

const COMPANIES = [
  createCompanyObject("משמש"),
  createCompanyObject("אננס"),
  createCompanyObject("אפרסק"),
  createCompanyObject("נקטרינה"),
];

const BATTALIONS = [
  createBattalionObject("ציה", [COMPANIES[0], COMPANIES[1]]),
  createBattalionObject("אבטיח", [COMPANIES[2]]),
  createBattalionObject("פסיפלורה", [COMPANIES[3]]),
];

const BRIGADES = [
  createBrigadeObject("ליצי", [BATTALIONS[0]]),
  createBrigadeObject("קיווי", [BATTALIONS[1]]),
  createBrigadeObject("אפרסמון", [BATTALIONS[2]]),
];

const DIVISIONS = [
  createDivisionObject("תות", [BRIGADES[0], BRIGADES[1]]),
  createDivisionObject("בננה", [BRIGADES[2]]),
];

const getDivisionsDecodesQuery = () =>
  DIVISIONS.map((division, index) => division.getCreateQuery(index)).join(" ");

const connectIncidentToDivision = (
  incident,
  divisionName
) => `MATCH (incidentDivision: Division {name: "${divisionName}"})
  CREATE (${incident})-[:Division]->(incidentDivision)`;

const connectIncidentToBrigade = (
  incident,
  brigadeName
) => `MATCH (incidentBrigade: Brigade {name: "${brigadeName}"})
  CREATE (${incident})-[:Brigade]->(incidentBrigade)`;

const connectIncidentToBattalion = (
  incident,
  battalionName
) => `MATCH (incidentBattalion: Battalion {name: "${battalionName}"})
  CREATE (${incident})-[:Battalion]->(incidentBattalion)`;

const connectIncidentToCompany = (
  incident,
  companyName
) => `MATCH (incidentCompany: Company {name: "${companyName}"})
  CREATE (${incident})-[:Company]->(incidentCompany)`;

const connectIncident = (
  incident,
  divisionName,
  brigadeName,
  battalionName,
  companyName
) => `
${connectIncidentToDivision(incident, divisionName)} 
WITH ${incident} 
${connectIncidentToBrigade(incident, brigadeName)} 
WITH ${incident} 
${connectIncidentToBattalion(incident, battalionName)} 
WITH ${incident} 
${connectIncidentToCompany(incident, companyName)}
`;

const getUnitStructure = () =>
  `MATCH (div:Division)<-[:CONTAINED]-(brigade:Brigade) 
  WITH div, brigade 
  MATCH (brigade)<-[:CONTAINED]-(battalion: Battalion) 
  WITH div, brigade, battalion 
  MATCH (battalion)<-[:CONTAINED]-(company:Company) 
  WITH div, brigade, battalion, company 
  WITH div, brigade, {name: battalion.name, companies: COLLECT({name: company.name})} AS battalionObject
  WITH div, {name: brigade.name, battalions: COLLECT(battalionObject)} AS brigadeObject 
  RETURN {name:div.name, brigades: COLLECT(brigadeObject)} AS divisions`


const getAllDivisionsQuery = () => `MATCH (divisions:Division) RETURN divisions.name AS name`;

const getAllBrigadesQuery = () => `MATCH (brigades:Brigade) RETURN brigades.name AS name`;

const getAllBattalionsQuery = () => `MATCH (battalions:Battalion) RETURN battalions.name AS name`;

const getAllCompaniesQuery = () => `MATCH (companies:Company) RETURN companies.name AS name`;

export default {
  getDivisionsDecodesQuery,
  getUnitStructure,
  connectIncident,
  getAllDivisionsQuery,
  getAllBrigadesQuery,
  getAllBattalionsQuery,
  getAllCompaniesQuery,
};
