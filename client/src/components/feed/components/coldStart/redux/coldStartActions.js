import coldStartTypes from "./coldStartTypes";

export const updateDivisions = divisions => ({
    type: coldStartTypes.UPDATE_DIVISIONS,
    payload: divisions,
});
export const updateBrigades = brigades => ({
    type: coldStartTypes.UPDATE_BRIGADES,
    payload: brigades,
});
export const updateBattalions = battalions => ({
    type: coldStartTypes.UPDATE_BATTALIONS,
    payload: battalions,
});
export const updateCompanies = companies => ({
    type: coldStartTypes.UPDATE_COMPANIES,
    payload: companies,
});
export const updateTypes = types => ({
    type: coldStartTypes.UPDATE_TYPES,
    payload: types,
});
export const updateOutlines = outlines => ({
    type: coldStartTypes.UPDATE_OUTLINES,
    payload: outlines,
});
export const updateResults = results => ({
    type: coldStartTypes.UPDATE_RESULTS,
    payload: results,
});
export const updateDestinations = destinations => ({
    type: coldStartTypes.UPDATE_DESTINATIONS,
    payload: destinations,
});
export const updateCurrentStepSelectedInterests = interests => ({
    type: coldStartTypes.UPDATE_CURRENT_STEP_SELECTED_INTERESTS,
    payload: interests,
});
export const clearCurrentStepSelectedInterests = () => ({
    type: coldStartTypes.CLEAR_CURRENT_STEP_SELECTED_INTERESTS,
});