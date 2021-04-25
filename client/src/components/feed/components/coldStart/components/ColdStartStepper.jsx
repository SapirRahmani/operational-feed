import React, { useState } from "react";
import ColdStartStep from "./ColdStartStep";
import { Stepper, Step, StepLabel, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDivisions,
  updateBrigades,
  updateBattalions,
  updateCompanies,
  clearCurrentStepSelectedInterests,
  updateOutlines,
  updateTypes,
  updateResults,
  updateCurrentStepSelectedInterests,
} from "../redux/coldStartActions";
import coldStartApi from "../coldStartApi";
import { useHistory } from "react-router";
import { ROUTES } from "../../../../../app.constants";

const useStyles = makeStyles((theme) => ({
  stepper: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
}));

const ColdStartStepper = ({
  divisions,
  brigades,
  battalions,
  companies,
  types,
  outlines,
  results,
  destinations,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.login.loggedUser);

  const selectedItems = useSelector(
    (state) => state.coldStart.currentStepSelectedInterests
  );
  const selectedDivisions = useSelector(
    (state) => state.coldStart.coldStart.divisions
  );
  const selectedBrigades = useSelector(
    (state) => state.coldStart.coldStart.brigades
  );
  const selectedBattalions = useSelector(
    (state) => state.coldStart.coldStart.battalions
  );
  const selectedCompanies = useSelector(
    (state) => state.coldStart.coldStart.companies
  );
  const selectedTypes = useSelector((state) => state.coldStart.coldStart.types);
  const selectedOutlines = useSelector(
    (state) => state.coldStart.coldStart.outlines
  );
  const selectedResults = useSelector(
    (state) => state.coldStart.coldStart.results
  );
  const selectedDestinations = useSelector(
    (state) => state.coldStart.coldStart.destinations
  );
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      options: divisions,
      handleNext: () => {
        dispatch(updateDivisions(selectedItems));
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedBrigades ? selectedBrigades : []
          )
        );
      },
      handleBack: () => {},
      label: "בחר אוגדות",
    },
    {
      options: brigades,
      handleNext: () => {
        dispatch(updateBrigades(selectedItems));
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedBattalions ? selectedBattalions : []
          )
        );
      },
      handleBack: () => {
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedDivisions ? selectedDivisions : []
          )
        );
      },
      label: "בחר חטיבות",
    },
    {
      options: battalions,
      handleNext: () => {
        dispatch(updateBattalions(selectedItems));
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedCompanies ? selectedCompanies : []
          )
        );
      },
      handleBack: () => {
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedBrigades ? selectedBrigades : []
          )
        );
      },
      label: "בחר גדודים",
    },
    {
      options: companies,
      handleNext: () => {
        dispatch(updateCompanies(selectedItems));
        dispatch(
          updateCurrentStepSelectedInterests(selectedTypes ? selectedTypes : [])
        );
      },
      handleBack: () => {
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedBattalions ? selectedBattalions : []
          )
        );
      },
      label: "בחר פלוגות",
    },
    {
      options: types,
      handleNext: () => {
        dispatch(updateTypes(selectedItems));
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedOutlines ? selectedOutlines : []
          )
        );
      },
      handleBack: () => {
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedCompanies ? selectedCompanies : []
          )
        );
      },
      label: "בחר סוגי אירועים",
    },
    {
      options: outlines,
      handleNext: () => {
        dispatch(updateOutlines(selectedItems));
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedResults ? selectedResults : []
          )
        );
      },
      handleBack: () => {
        dispatch(
          updateCurrentStepSelectedInterests(selectedTypes ? selectedTypes : [])
        );
      },
      label: "בחר מתווים",
    },
    {
      options: results,
      handleNext: () => {
        dispatch(updateResults(selectedItems));
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedDestinations ? selectedDestinations : []
          )
        );
      },
      handleBack: () => {
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedOutlines ? selectedOutlines : []
          )
        );
      },
      label: "בחר תוצאות אירועים",
    },
    {
      options: destinations,
      handleNext: () => {
        const fieldsNames = [
          ...selectedDivisions,
          ...selectedBrigades,
          ...selectedBattalions,
          ...selectedCompanies,
          ...selectedTypes,
          ...selectedOutlines,
          ...selectedResults,
          ...selectedItems,
        ];
        coldStartApi.connectUserInterestToFields(loggedUser, fieldsNames);
        dispatch(clearCurrentStepSelectedInterests());
        history.replace(ROUTES.FEED);
      },
      handleBack: () => {
        dispatch(
          updateCurrentStepSelectedInterests(
            selectedResults ? selectedResults : []
          )
        );
      },
      label: "בחר ייעדים",
    },
  ];

  return (
    <>
      <ColdStartStep
        options={steps[currentStep].options}
        handleNext={(_e) => {
          steps[currentStep].handleNext();
          if (currentStep !== steps.length - 1) {
            setCurrentStep((prevActiveStep) => prevActiveStep + 1);
          }
        }}
        nextButtonText={currentStep === steps.length - 1 ? "סיים" : "הבא"}
        isFirstStep={currentStep === 0}
        handlePrev={(_e) => {
          steps[currentStep].handleBack();
          setCurrentStep((prevActiveStep) => prevActiveStep - 1);
        }}
      />
      <Stepper
        className={classes.stepper}
        activeStep={currentStep}
        alternativeLabel
      >
        {steps.map((coldStartStep) => {
          const { label } = coldStartStep;
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
};

export default ColdStartStepper;
