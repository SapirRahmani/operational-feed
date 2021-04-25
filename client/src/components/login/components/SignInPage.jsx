import React, { Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SigningPage from "../../../assets/SigningPage";
import loginApi from "../loginApi";
import { updateLoggedUser } from "../redux/loginActions";
import { ROUTES } from "../../../app.constants";
import { STRINGS } from "../login.constants";

const SignInPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (_userFullName, userPersonalNumber) => {
    try {
      const signInStatus = await loginApi.signInUser(userPersonalNumber);

      if (signInStatus) {
        dispatch(updateLoggedUser(userPersonalNumber));
        history.replace(ROUTES.FEED);
      } else {
        toast.error(STRINGS.COULD_NOT_SIGN_IN_MESSAGE);
      }
    } catch {
      toast.error(STRINGS.COULD_NOT_SIGN_IN_MESSAGE);
    }
  };

  const goToRegistration = () => {
    history.push(`${ROUTES.LOGIN}${ROUTES.REGISTER}`);
  };

  return (
    <Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs>
          <SigningPage
            onSubmit={onSubmit}
            submitTitle={STRINGS.SIGN_IN_SUBMIT_TEXT}
            title={STRINGS.SIGN_IN_PAGE_TITLE}
          />
        </Grid>
        <Grid item xs>
          <Button variant="text" color="primary" onClick={goToRegistration}>
            {STRINGS.SIGN_IN_GO_TO_REGISTRATION_TEXT}
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default SignInPage;
