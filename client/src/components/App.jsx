import React, { useEffect } from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  makeStyles,
  Container,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import Feed from "./feed/Feed";
import Login from "./login";
import { ROUTES } from "../app.constants";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#303030",
    maxWidth: "100%",
    padding: 0,
    margin: 0,
  },
  appBar: {
    width: "100%",
  },
}));

const App = () => {
  const history = useHistory();
  const classes = useStyles();
  const loggedUser = useSelector((state) => state.login.loggedUser);

  useEffect(() => {
    if (loggedUser) {
      history.replace(ROUTES.FEED);
    } else {
      history.replace(ROUTES.LOGIN);
    }
  }, [loggedUser, history]);

  return (
    <Container fixed className={classes.root}>
      <AppBar position="static" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Operational Feed</Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path={ROUTES.FEED} component={Feed} />
        <Route path={ROUTES.LOGIN} component={Login} />
      </Switch>
    </Container>
  );
};

export default App;
