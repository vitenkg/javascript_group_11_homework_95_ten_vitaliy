import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {useSelector} from "react-redux";

export const FETCH_COCKTAILS_REQUEST = 'FETCH_COCKTAILS_REQUEST';
export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const FETCH_COCKTAILS_FAILURE = 'FETCH_COCKTAILS_FAILURE';

export const CREATE_COCKTAIL_REQUEST = 'CREATE_COCKTAIL_REQUEST';
export const CREATE_COCKTAIL_SUCCESS = 'CREATE_COCKTAIL_SUCCESS';
export const CREATE_COCKTAIL_FAILURE = 'CREATE_COCKTAIL_FAILURE';

export const FETCH_COCKTAIL_REQUEST = 'FETCH_COCKTAIL_REQUEST';
export const FETCH_COCKTAIL_SUCCESS = 'FETCH_COCKTAIL_SUCCESS';
export const FETCH_COCKTAIL_FAILURE = 'FETCH_COCKTAIL_FAILURE';


export const fetchCocktailRequest = () => ({type:FETCH_COCKTAIL_REQUEST});
export const fetchCocktailSuccess = data => ({type:FETCH_COCKTAIL_SUCCESS, payload: data});
export const fetchCocktailFailure = () => ({type:FETCH_COCKTAIL_REQUEST});

export const fetchCocktailsRequest = () => ({type: FETCH_COCKTAILS_REQUEST});
export const fetchCocktailsSuccess = data => ({type: FETCH_COCKTAILS_SUCCESS, payload: data});
export const fetchCocktailsFailure = () => ({type: FETCH_COCKTAILS_FAILURE});

export const createCocktailRequest = () => ({type: CREATE_COCKTAIL_REQUEST});
export const createCocktailSuccess = data => ({type: CREATE_COCKTAIL_SUCCESS, payload: data});
export const createCocktailFailure = error => ({type: CREATE_COCKTAIL_FAILURE, payload: error});

export const fetchCocktail = id => {
    return async dispatch => {
        try {
            dispatch (fetchCocktailRequest());
            const response = await axiosApi.get('/cocktails/:' + id);
            dispatch (fetchCocktailSuccess(response.data));
        } catch (e) {
            dispatch(fetchCocktailFailure(e));
        }
    }
};


export const fetchCocktails = (user) => {
    return async (dispatch, getState) => {
        let response = null;
        try {
            dispatch (fetchCocktailsRequest());

            if (user) {
                response = await axiosApi.get('/cocktails?token=' + getState().users.user.token);
            } else {
                response = await axiosApi.get('/cocktails');
            }


            console.log(response.data);
            dispatch (fetchCocktailsSuccess(response.data));
        } catch (e) {
            dispatch(fetchCocktailsFailure(e));
        }
    }
};

export const createCocktail = data => {
    return async (dispatch, getState) => {
        try {
            dispatch(createCocktailRequest());
            await axiosApi.post('/cocktails', data,
                {
                headers: {
                    'Authorization': getState().users.user && getState().users.user.token,
                },

            });
            dispatch(createCocktailSuccess());
            dispatch(historyPush('/'));
            toast.success('Saves successfully');
        } catch (e) {
            dispatch(createCocktailFailure(e))
        }
    }
};