import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SigningPage = ({ title, submitTitle, onSubmit }) => {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [personalNumber, setPersonalNumber] = useState("");

  const handleFullNameFieldChange = (event) => {
    setFullName(event.target.value);
  };

  const handlePersonalNumberFieldChange = (event) => {
    setPersonalNumber(event.target.value);
  };

  const handleOnSubmit = () => {
    onSubmit(fullName, personalNumber);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      </div>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      <div className={classes.form}>
        <TextField
          value={personalNumber}
          variant="outlined"
          required
          fullWidth
          label="מספר אישי"
          onChange={handlePersonalNumberFieldChange}
        />
        <TextField
          value={fullName}
          variant="outlined"
          required
          fullWidth
          label="שם מלא"
          onChange={handleFullNameFieldChange}
        />
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleOnSubmit}
      >
        {submitTitle}
      </Button>
    </Container>
  );
};

export default SigningPage;
