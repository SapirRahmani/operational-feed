import React from "react";
import { Button, Grid } from "@material-ui/core";
import ChooseUserInterest from "./ChooseUserInterest";

const ColdStartStep = ({
  options,
  handleNext,
  handlePrev,
  nextButtonText,
  isFirstStep,
}) => {
  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <ChooseUserInterest interestItemsOptions={options} />
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="flex-end"
          justify="center"
          spacing={3}
        >
          <Grid item>
            <Button
              variant="contained"
              onClick={handlePrev}
              disabled={isFirstStep}
            >
              הקודם
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleNext}>
              {nextButtonText}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ColdStartStep;
