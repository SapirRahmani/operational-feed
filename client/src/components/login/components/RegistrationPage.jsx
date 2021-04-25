import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SigningPage from "../../../assets/SigningPage";
import loginApi from "../loginApi";
import { ROUTES } from "../../../app.constants";
import { STRINGS } from "../login.constants";
import { updateLoggedUser } from "../redux/loginActions";

const RegistrationPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = async (userFullName, userPersonalNumber) => {
        const signInStatus = await loginApi.registerUser(userPersonalNumber, userFullName);

        if (signInStatus) {
            dispatch(updateLoggedUser(userPersonalNumber));
            history.replace(ROUTES.FEED);
        } else {
            toast.error(STRINGS.COULD_NOT_REGISTER_MESSAGE);
        }
    };

    return (
        <Fragment>
            <SigningPage onSubmit={onSubmit} submitTitle={STRINGS.REGISTRATION_SUBMIT_TEXT} title={STRINGS.REGISTRATION_PAGE_TITLE} /> 
        </Fragment>
    );
};

export default RegistrationPage;