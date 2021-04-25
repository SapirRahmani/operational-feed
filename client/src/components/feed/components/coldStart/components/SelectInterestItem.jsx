import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, CardActionArea, Typography } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  center: {
    justifySelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    marginTop: 5,
    height: 200,
    width: 200,
  },
  checkedIcon: {
    position: "absolute",
    bottom: 0,
    left: 0,
    color: theme.palette.success.main,
    marginLeft: 15,
    marginBottom: 15,
  },
}));

const SelectInterestItem = ({
  title,
  onSelected,
  onRemoved,
  selectedInitialState,
}) => {
  const classes = useStyles();

  const [isSelected, setIsSelected] = useState(selectedInitialState);

  const handleClick = (_e) => {
    const selectedState = !isSelected;

    setIsSelected(selectedState);

    if (selectedState) {
      onSelected(title);
    } else {
      onRemoved(title);
    }
  };

  return (
    <CardActionArea onClick={handleClick}>
      <Paper className={`${classes.gridItem} ${classes.center}`} elevation={5}>
        {isSelected ? (
          <CheckCircle className={classes.checkedIcon} />
        ) : undefined}
        <Typography variant="h4">{title}</Typography>
      </Paper>
    </CardActionArea>
  );
};

export default SelectInterestItem;
