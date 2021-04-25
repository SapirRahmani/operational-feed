import coldStartTypes from "./coldStartTypes";

const coldStartReducer = (state = { coldStart: [], currentStepSelectedInterests: [] }, action) => {
    switch (action.type) {

        case coldStartTypes.UPDATE_DIVISIONS: {
            return {
                ...state, coldStart: { ...state.coldStart, divisions: [...action.payload] }
            }
        }
        case coldStartTypes.UPDATE_BRIGADES: {
            return {
                ...state, coldStart: { ...state.coldStart, brigades: [...action.payload] }
            }
        }
        case coldStartTypes.UPDATE_BATTALIONS: {
            return {
                ...state, coldStart: { ...state.coldStart, battalions: [...action.payload] }
            }
        }
        case coldStartTypes.UPDATE_COMPANIES: {
            return {
                ...state, coldStart: { ...state.coldStart, companies: [...action.payload] }
            }
        }
        case coldStartTypes.UPDATE_TYPES: {
            return {
                ...state, coldStart: { ...state.coldStart, types: [...action.payload] }
            }
        }
        case coldStartTypes.UPDATE_OUTLINES: {
            return {
                ...state, coldStart: { ...state.coldStart, outlines: [...action.payload] }
            }
        }
        case coldStartTypes.UPDATE_RESULTS: {
            return {
                ...state, coldStart: { ...state.coldStart, results: [...action.payload] }
            }
        }
        case coldStartTypes.UPDATE_DESTINATIONS: {
            return {
                ...state, coldStart: { ...state.coldStart, destinations: [...action.payload] }
            }
        }
        case coldStartTypes.UPDATE_CURRENT_STEP_SELECTED_INTERESTS: {
            return {
                ...state, currentStepSelectedInterests: action.payload
            }
        }
        case coldStartTypes.CLEAR_CURRENT_STEP_SELECTED_INTERESTS: {
            return { ...state, currentStepSelectedInterests: [] }
        }
        default:
            return state
    }
}

export default coldStartReducer