import React from "react";
import IncidentCard from "../incidentCard";
import { Grid } from "@material-ui/core";

const incidentsaHardCoded = [
  {
    _id: 24,
    date: new Date(),
    locationDescription: "הירקניה של אבי",
    type: "הכנת מילקשייק",
    outline: "קיצוץ",
    result: "מילקשייק",
    division: "בננה",
    brigade: "אפרסמון",
    battalion: "פסיפלורה",
    company: "נקטרינה",
    destination: "מיקסר",
  },
  {
    _id: 25,
    date: new Date(),
    locationDescription: "היוגורט של מיקה",
    type: "הכנת פרוזן יוגורט",
    outline: "ערבול",
    result: "פרוזן יוגורט",
    division: "תות",
    brigade: "ליצי",
    battalion: "צ'יה",
    company: "אננס",
    destination: "בלנדר",
  },
];

const IncidentsList = ({
  incidents = incidentsaHardCoded,
  isFlagIconShown,
  likeIncident,
  unlikeIncident,
}) => {
  return (
    <div>
      <Grid container direction="row">
        {incidents.map((value, index) => (
          <Grid key={index} item md={4} xs={12}>
            <IncidentCard
              incident={value}
              isFlagIconShown={isFlagIconShown}
              likeIncident={likeIncident}
              unlikeIncident={unlikeIncident}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default IncidentsList;
