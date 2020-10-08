import * as ActionTypes from './ActionType';

export const Promotions = (state  = { isLoading: true,
                                        errmss: null,
                                        promotions:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOS:
        return {...state, isLoading: false, errmss: null, promotions: action.payload};

        case ActionTypes.PROMOS_LOADING:
            return {...state, isLoading: true, errmss: null, promotions: []}

        case ActionTypes.PROMOS_FAILED:
            return {...state, isLoading: false, errmss: action.payload};

        default:
          return state;
      }
};