import axios from "axios";

const getFeedData = async (userPersonalNumber) => {
  const feedData = await axios.get(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/api/incidents/feed/${userPersonalNumber}`);
  return feedData.data;
};

const unlikeIncident = async (personalNumber, incidentId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/api/incidents/unlike`,
    {
      personalNumber,
      incidentId,
    }
  );

  return response.status === 200;
};

const likeIncident = async (personalNumber, incidentId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/api/incidents/like`,
    {
      personalNumber,
      incidentId,
    }
  );

  return response.status === 200;
};

const getUserInitializeState = async (userPersonalNumber) => {
  const response = await axios.get(`${process.env.REACT_APP_IP}:${process.env.REACT_APP_NODE_PORT}/api/users/${userPersonalNumber}/initializeState`);
  return response.data[0].isInitialized;
};

export default {
  getFeedData,
  likeIncident,
  unlikeIncident,
  getUserInitializeState
};

