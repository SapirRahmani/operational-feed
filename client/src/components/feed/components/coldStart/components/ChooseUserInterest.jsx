import React, { useState, useEffect } from "react";

import { Grid, Typography, makeStyles } from "@material-ui/core";
import SelectInterestList from "./SelectInterestList.jsx";
import SearchField from "../../../../../assets/SearchField";

const useStyles = makeStyles((theme) => ({
  interestOptionsTitle: {
    color: theme.palette.primary.contrastText,
    marginLeft: 30,
  },
}));

const ChooseUserInterest = ({ interestItemsOptions }) => {
  const classes = useStyles();
  const [interestsItems, setInterestsItems] = useState([]);

  useEffect(() => {
    setInterestsItems(interestItemsOptions.data);
  }, [interestItemsOptions]);

  const onSearchFieldChange = (searchedText) => {
    return setInterestsItems(
      interestItemsOptions.data.filter((interestItem) =>
        interestItem.name.startsWith(searchedText)
      )
    );
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <SearchField onSearchFieldChange={onSearchFieldChange} />
        </Grid>
        <Grid item>
          <Typography className={classes.interestOptionsTitle} variant="h5">
            {interestItemsOptions.title}
          </Typography>
        </Grid>
        <Grid item>
          <SelectInterestList options={interestsItems} />
        </Grid>
      </Grid>
    </>
  );
};

export default ChooseUserInterest;
