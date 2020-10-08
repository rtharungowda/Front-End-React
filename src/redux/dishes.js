import * as ActionTypes from './ActionType';

export const Dishes = (state ={
	isLoading: true,
	errmss: null,
	dishes: []
}, action) =>{
	switch(action.type){

		case ActionTypes.DISHES_LOADING :
			return {...state, isLoading:true, errmss: null, dishes:[]}
		
		case ActionTypes.DISHES_FAILED :
			return {...state, isLoading:false, errmss: action.payload}
		
		case ActionTypes.ADD_DISHES :
			return {...state, isLoading:false, errmss: null, dishes:action.payload}
			
		default:
		return state;
	}
};  