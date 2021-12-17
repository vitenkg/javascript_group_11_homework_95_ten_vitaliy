import {
    FETCH_COCKTAIL_FAILURE,
    FETCH_COCKTAIL_REQUEST, FETCH_COCKTAIL_SUCCESS,
    FETCH_COCKTAILS_FAILURE,
    FETCH_COCKTAILS_REQUEST,
    FETCH_COCKTAILS_SUCCESS
} from "../actions/cocktailActions";

const initialState = {
    fetchLoading: false,
    cocktails: [],
    cocktail: null,
};

const cocktailsReducer = (state = initialState, action) => {
    const payload = action.payload;
    switch (action.type) {
        case FETCH_COCKTAILS_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_COCKTAILS_SUCCESS:
            return {...state,  fetchLoading: false, cocktails: payload};
        case FETCH_COCKTAILS_FAILURE:
            return {...state, fetchLoading: false};
        case FETCH_COCKTAIL_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_COCKTAIL_SUCCESS:

            return {...state,  fetchLoading: false, cocktail: payload};
        case FETCH_COCKTAIL_FAILURE:
            return {...state, fetchLoading: false};

        default:
            return state;
    }
};

export default cocktailsReducer;