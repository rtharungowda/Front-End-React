import *  as ActionTypes from "./ActionType";

export const addComment = (dishId, rating, name, comment) =>{
		return ({type: ActionTypes.ADD_COMMENT,
				
						payload:{
							dishId:dishId,
							rating:rating,
							author:name,
							comment:comment
						}});
}