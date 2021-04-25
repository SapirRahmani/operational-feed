import unitsDao from "./unitsDao";
import utils from "../db/utils";

const getAllDivisions = async (req, res) => {
    const session = req.driver.session();

    try {
        const query = unitsDao.getAllDivisionsQuery();
        const response = await session.run(query);
        session.close();
        const data = utils.parseResponse(response);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        session.close();
        res.status(500).send("Failed");
    }
};

const getAllBrigades = async (req, res) => {
    const session = req.driver.session();

    try {
        const query = unitsDao.getAllBrigadesQuery();
        const response = await session.run(query);
        session.close();
        const data = utils.parseResponse(response);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        session.close();
        res.status(500).send("Failed");
    }
};

const getAllBattalions = async (req, res) => {
    const session = req.driver.session();

    try {
        const query = unitsDao.getAllBattalionsQuery();
        const response = await session.run(query);
        session.close();
        const data = utils.parseResponse(response);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        session.close();
        res.status(500).send("Failed");
    }
};

const getAllCompanies = async (req, res) => {
    const session = req.driver.session();

    try {
        const query = unitsDao.getAllCompaniesQuery();
        const response = await session.run(query);
        session.close();
        const data = utils.parseResponse(response);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        session.close();
        res.status(500).send("Failed");
    }
};

export default {
    getAllDivisions,
    getAllBrigades,
    getAllBattalions,
    getAllCompanies
}