import React, { useEffect, useState, Fragment } from "react";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import IncidentsList from "../../assets/incidentList";
import ColdStart from "./components/coldStart";
import feedApi from "./feedApi";
import coldStartApi from "./components/coldStart/coldStartApi";
import { ROUTES } from "../../app.constants";
import { STRINGS } from "./feed.constants";

const Feed = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const loggedUser = useSelector((state) => state.login.loggedUser);

  const [feedData, setFeedData] = useState([]);
  const [coldStartDataFromDb, setColdStartDataFromDb] = useState({
    divisions: { title: "", data: [] },
    brigades: { title: "", data: [] },
    battalions: { title: "", data: [] },
    companies: { title: "", data: [] },
    types: { title: "", data: [] },
    outlines: { title: "", data: [] },
    results: { title: "", data: [] },
    destinations: { title: "", data: [] },
  });

  const likeIncident = async (incidentId) => {
    const didExecuteSuccessfully = await feedApi.likeIncident(
      loggedUser,
      incidentId
    );

    if (didExecuteSuccessfully) {
      toast.success(STRINGS.LIKE_INCIDENT_EXECUTED_SUCCESSFULLY);
    } else {
      toast.error(STRINGS.LIKE_INCIDENT_EXECUTE_FAILED);
    }

    return didExecuteSuccessfully;
  };

  const unlikeIncident = async (incidentId) => {
    const didExecuteSuccessfully = await feedApi.likeIncident(
      loggedUser,
      incidentId
    );

    if (didExecuteSuccessfully) {
      toast.success(STRINGS.UNLIKE_INCIDENT_EXECUTED_SUCCESSFULLY);
    } else {
      toast.error(STRINGS.UNLIKE_INCIDENT_EXECUTE_FAILED);
    }

    return didExecuteSuccessfully;
  };

  const feedPage = () => {
    return (
      <IncidentsList
        incidents={feedData}
        likeIncident={likeIncident}
        unlikeIncident={unlikeIncident}
      />
    );
  };

  const coldStartPage = () => {
    return <ColdStart coldStartData={coldStartDataFromDb} />;
  };

  useEffect(() => {
    const getFeedData = async () => {
      const apiFeedData = await feedApi.getFeedData(loggedUser);

      setFeedData(apiFeedData);
    };

    const onMount = async () => {
      const isUserInitialized = await feedApi.getUserInitializeState(
        loggedUser
      );
      if (isUserInitialized) {
        getFeedData();
      } else if (match.url === ROUTES.FEED) {
        history.replace(`${ROUTES.FEED}${ROUTES.COLD_START}`);
      }
    };

    onMount();
  }, [match.url, history, loggedUser]);

  useEffect(() => {
    const getDataFromDb = async () => {
      try {
        const divisionsFromApi = await coldStartApi.getDivisions();
        const brigadesFromApi = await coldStartApi.getBrigades();
        const battalionsFromApi = await coldStartApi.getBattalions();
        const companiesFromApi = await coldStartApi.getCompanies();
        const typesFromApi = await coldStartApi.getTypes();
        const outlinesFromApi = await coldStartApi.getOutlines();
        const resultsFromApi = await coldStartApi.getResults();
        const destinationsFromApi = await coldStartApi.getDestinations();

        setColdStartDataFromDb({
          divisions: { title: "אוגדות", data: divisionsFromApi },
          brigades: { title: "חטיבות", data: brigadesFromApi },
          battalions: { title: "גדודים", data: battalionsFromApi },
          companies: { title: "פלוגות", data: companiesFromApi },
          types: { title: "סוגי אירועים", data: typesFromApi },
          outlines: { title: "מתווים", data: outlinesFromApi },
          results: { title: "תוצאות", data: resultsFromApi },
          destinations: { title: "יעדים", data: destinationsFromApi },
        });
      } catch (error) {
        console.log(error);
      }
    };

    getDataFromDb();
  }, []);

  return (
    <Fragment>
      <Route
        exact
        path={`${ROUTES.FEED}${ROUTES.COLD_START}`}
        component={coldStartPage}
      />
      <Route exact path={`${ROUTES.FEED}`} component={feedPage} />
    </Fragment>
  );
};

export default Feed;
