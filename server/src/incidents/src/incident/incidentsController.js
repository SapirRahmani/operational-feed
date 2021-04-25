import incidentsDao from "./incidentsDao";
import utils from "../db/utils";

const likeIncident = async (req, res) => {
  const session = req.driver.session();

  try {
    const query = incidentsDao.likeIncident(
      req.body.personalNumber,
      req.body.incidentId
    );
    const { summary } = await session.run(query);
    session.close();
    const isExecutedSuccessfully =
      summary.counters._stats.relationshipsCreated == 1;

    isExecutedSuccessfully
      ? res.status(200).send("Liked!")
      : res.status(400).send("user or incident not found");
  } catch (error) {
    console.log(error);
    session.close();
    res.status(500).send("Failed to like");
  }
};

const unlikeIncident = async (req, res) => {
  const session = req.driver.session();

  try {
    const query = incidentsDao.unlikeIncident(
      req.body.personalNumber,
      req.body.incidentId
    );
    const { summary } = await session.run(query);
    session.close();
    const isExecutedSuccessfully =
      summary.counters._stats.relationshipsDeleted == 1;

    isExecutedSuccessfully
      ? res.status(200).send("Unliked!")
      : res.status(400).send("user or incident not found");
  } catch (error) {
    console.log(error);
    session.close();
    res.status(500).send("Failed to Unliked");
  }
};

const addIncident = async (req, res) => {
  const session = req.driver.session();
  const {
    outline,
    type,
    result,
    destination,
    division,
    brigade,
    battalion,
    company,
    locationDescription,
    date,
  } = req.body;
  const query = incidentsDao.createNewIncident(
    locationDescription,
    date,
    division,
    brigade,
    battalion,
    company,
    destination,
    outline,
    result,
    type
  );

  try {
    const { summary } = await session.run(query);
    session.close();
    const isExecutedSuccessfully = summary.counters._stats.nodesCreated == 1;

    isExecutedSuccessfully
      ? res.status(200).send("saved incident successfully")
      : res.status(400).send("could not create incident");
  } catch (error) {
    console.log(error);
    res.status(500).send("failed to save incident");
  }
};

const getSuggestedIncidents = async (req, res) => {
  const session = req.driver.session();

  try {
    const query = incidentsDao.getFeedIncidents(req.params.userPersonalNumber);
    const result = await session.run(query);
    session.close();

    const data = utils.parseResponse(result);

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    session.close();
    res.status(500).send("Failed to get suggested incidents");
  }
};

export default {
  addIncident,
  likeIncident,
  unlikeIncident,
  getSuggestedIncidents,
};
