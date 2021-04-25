import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import SelectInterestItem from "./SelectInterestItem";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentStepSelectedInterests } from "../redux/coldStartActions";

const useStyles = makeStyles((theme) => ({
  fadeBackground: {
    margin: "15px",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
}));

const SelectInterestList = ({ options }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selectedInterestItems = useSelector(
    (state) => state.coldStart.currentStepSelectedInterests
  );

  const onSelect = (interestItem) => {
    dispatch(
      updateCurrentStepSelectedInterests([
        ...selectedInterestItems,
        interestItem,
      ])
    );
  };

  const onRemove = (interestItem) => {
    dispatch(
      updateCurrentStepSelectedInterests(
        selectedInterestItems.filter((item) => item !== interestItem)
      )
    );
  };

  return (
    <>
      <Grid
        className={`${classes.fadeBackground}`}
        container
        direction="row"
        alignItems="center"
        spacing={4}
      >
        {options.map((option) => (
          <Grid key={option.name} item>
            <SelectInterestItem
              title={option.name}
              onSelected={onSelect}
              onRemoved={onRemove}
              selectedInitialState={selectedInterestItems.includes(option.name)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default SelectInterestList;
