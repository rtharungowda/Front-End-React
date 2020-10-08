import * as ActionTypes from './ActionType';


export const Leaders = (state = {
	isLoading: true,
	errmss : null,
	leaders: []
}, action) =>{
	switch(action.type){
		case ActionTypes.ADD_LEADERS :
			return {...state, isLoading:false, errmss: null, leaders : action.payload };
		case ActionTypes.LEADERS_LOADING:
			return { ...state, isLoading: true, errmss: null, leaders : [] };
		case ActionTypes.LEADERS_FAILED:
			return { ...state, isLoading: false, errmss: action.payload, leaders: [] };
		default:
		return state;
	}
};  