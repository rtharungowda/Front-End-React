import *  as ActionTypes from "./ActionType";
import { DISHES } from '../shared/dishes' ;

export const addComment = (dishId, rating, name, comment) =>{
		return ({type: ActionTypes.ADD_COMMENT,
				
						payload:{
							dishId:dishId,
							rating:rating,
							author:name,
							comment:comment
						}});
}

export const fetchDishes = () => (dispatch) =>{
	dispatch(dishesLoading(true));

	setTimeout(()=>{
		dispatch(addDishes(DISHES))
	}, 10);
}

export const addDishes = (dishes) =>({
	type : ActionTypes.ADD_DISHES,
	payload : dishes
}) 

export const dishesLoading = (payload) =>({
	type : ActionTypes.DISHES_LOADING,
})

export const dishesFailed = (errmss) => ({
	type: ActionTypes.DISHES_FAILED,
	payload: errmss
})