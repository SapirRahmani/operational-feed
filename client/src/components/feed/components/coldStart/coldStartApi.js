import apiUtils from "../../../../utils/apiUtils";
const apiUrl = `${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/api`;

const getDivisions = async () => {
    const divisions = await apiUtils.getDataByUrl(`${apiUrl}/units/divisions`);
    return divisions;
};

const getBrigades = async () => {
    const brigades = await apiUtils.getDataByUrl(`${apiUrl}/units/brigades`)
    return brigades;
};

const getBattalions = async () => {
    const battalions = await apiUtils.getDataByUrl(`${apiUrl}/units/battalions`);
    return battalions;
};

const getCompanies = async () => {
    const companies = await apiUtils.getDataByUrl(`${apiUrl}/units/companies`);
    return companies;
};

const getTypes = async () => {
    const types = await apiUtils.getDataByUrl(`${apiUrl}/types`);
    return types;
};

const getOutlines = async () => {
    const outlines = await apiUtils.getDataByUrl(`${apiUrl}/outlines`);
    return outlines;
};

const getResults = async () => {
    const results = await apiUtils.getDataByUrl(`${apiUrl}/results`);
    return results;
};

const getDestinations = async () => {
    const destinations = await apiUtils.getDataByUrl(`${apiUrl}/destinations`);
    return destinations;
};

const connectUserInterestToFields = async (personalNumber, fieldsNames) => {
    try {
        const status = await apiUtils.sendPostRequest(`${apiUrl}/users/interests`, {
            personalNumber,
            fieldsNames
        });

        return status === 200;
    } catch (error) {
        return false;
    }
}



export default {
    getDivisions,
    getBrigades,
    getBattalions,
    getCompanies,
    getTypes,
    getOutlines,
    getResults,
    getDestinations,
    connectUserInterestToFields
};

