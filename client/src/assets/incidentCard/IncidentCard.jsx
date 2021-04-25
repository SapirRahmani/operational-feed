import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  makeStyles,
  Breadcrumbs,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { LocationOn, Star, DateRange } from "@material-ui/icons";
import Moment from "react-moment";

const IncidentCard = ({
  incident,
  isFlagIconShown = true,
  unlikesIncident,
  likesIncident,
}) => {
  const [isFlaged, setIsFlaged] = useState(false);

  const useStyles = makeStyles((_theme) => ({
    card: {
      maxWidth: "350px",
      padding: "15px",
      margin: "15px auto 15px auto",
    },
    avatar: {
      fontSize: "24px",
      color: "white",
      fontWeight: "bold",
    },
    center: {
      display: "flex",
      alignItems: "center",
    },
    cardContent: {
      display: "grid",
      justifyContent: "left",
    },
  }));

  const {
    _id,
    date,
    locationDescription,
    type,
    outline,
    result,
    destination,
    division,
    brigade,
    battalion,
    company,
  } = incident;

  const classes = useStyles();

  const handleFlageClicked = () => {
    if (!isFlaged && likesIncident(_id)) {
      setIsFlaged(true);
    } else if (unlikesIncident(_id)) {
      setIsFlaged(false);
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          subheader={
            <div className={classes.center}>
              <LocationOn color="primary" />
              <Typography variant="h6" color="primary">
                {locationDescription}
              </Typography>
            </div>
          }
          title={`${type},${outline}`}
        />
        <CardContent className={classes.cardContent}>
          <Breadcrumbs>
            <Typography color="inherit">{division}</Typography>
            <Typography color="inherit">{brigade}</Typography>
            <Typography color="inherit">{battalion}</Typography>
            <Typography color="textPrimary">{company}</Typography>
          </Breadcrumbs>
          <Typography
            variant="body1"
            color="textPrimary"
            className={classes.center}
          >
            <DateRange />
            <Moment format="DD/MM/YYYY HH:mm">{date}</Moment>
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {`תוצאה: ${result}`}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {`יעד: ${destination}`}
          </Typography>
        </CardContent>
        {isFlagIconShown ? (
          <CardActions dir="ltr">
            <IconButton onClick={handleFlageClicked}>
              <Star color={isFlaged ? "secondary" : "action"} />
            </IconButton>
          </CardActions>
        ) : undefined}
      </Card>
    </>
  );
};

export default IncidentCard;
