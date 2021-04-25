import outlinesDao from "./outlinesDao";
import utils from "../db/utils";

const getAllOutlines = async (req, res) => {
    const session = req.driver.session();

    try {
        const query = outlinesDao.getAllOutlinesQuery();
        const response = await session.run(query);
        session.close();
        const data = utils.parseResponse(response);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        session.close();
        res.status(500).send("Failed");
    }
}

export default {
    getAllOutlines
}