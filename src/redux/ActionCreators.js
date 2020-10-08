import *  as ActionTypes from "./ActionType";
// import { DISHES } from '../shared/dishes' ;
// import {COMMENTS} from '../shared/comments';
// import {PROMOTIONS} from '../shared/promotions';
// import {LEADERS} fro '../shared/leaders';
import {baseUrl} from '../shared/baseURL';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const fetchDishes = () => (dispatch) => {   
	dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
    .then(response => {
    	if (response.ok)
    		return response;
    	else {
    		var error = new Error('Error ' + response.status + ": "+response.statusText);
    		error.response = response;
    		throw error;
    	}
    }, error => {
    	var errmss = new Error(error.message);
    	throw errmss;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};


export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
    	if (response.ok)
    		return response;
    	else {
    		var error = new Error('Error ' + response.status + ": "+response.statusText);
    		error.response = response;
    		throw error;
    	}
    }, error => {
    	var errmss = new Error(error.message);
    	throw errmss;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const fetchPromos = () => (dispatch) =>{
	dispatch(promosLoading(true));
	return fetch(baseUrl + 'promotions')
	.then(response => {
    	if (response.ok)
    		return response;
    	else {
    		var error = new Error('Error ' + response.status + ": "+response.statusText);
    		error.response = response;
    		throw error;
    	}
    }, error => {
    	var errmss = new Error(error.message);
    	throw errmss;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const fetchLeaders =() => (dispatch) => {
    dispatch(leardersLoading(true))
    return fetch(baseUrl + 'leaders')
    .then (response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error'+response.status+': '+response.statusText);
            error.response = response;
            throw error;
        }
    }, error => {
        var errmss = new Error(error.message);
        throw errmss;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)))
}
//dishes
export const addDishes = (dishes) =>({
	type : ActionTypes.ADD_DISHES,
	payload : dishes
}); 

export const dishesLoading = (payload) =>({
	type : ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmss) => ({
	type: ActionTypes.DISHES_FAILED,
	payload: errmss
});

//comments
export const addComments = (comments) =>({
	type : ActionTypes.ADD_COMMENTS,
	payload : comments
}); 

export const commentsFailed = (errmss) =>({
	type : ActionTypes.COMMENTS_FAILED,
	payload:errmss
});

export const addPromos = (promos) =>({
	type : ActionTypes.ADD_PROMOS,
	payload : promos
});

// promos
export const promosLoading = (payload) =>({
	type : ActionTypes.PROMOS_LOADING,
})

export const promosFailed = (errmss) => ({
	type: ActionTypes.PROMOS_FAILED,
	payload: errmss
});

//Leaders
export const addLeaders = (leaders) => ({
    type : ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const leardersLoading = ()=>({
    type : ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmss) => ({
    type : ActionTypes.LEADERS_FAILED,
    payload : errmss
});


export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
    };

    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;

                throw error;
            }
        },
            error => {
                var errmss = new Error(error.message);
                throw errmss;
            }
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('Post comments: ' + error.message);
            alert('Comments could not be posted:\n' + error.message)
        })
};


export const postFeedback = (feedback) => (dispatch) => {
    const newFeedback = Object.assign({ date: new Date().toISOString() }, feedback);
    
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;

                throw error;
            }
        },
            error => {
                var errmss = new Error(error.message);
                throw errmss;
            }
        )
        .then(response => response.json())
        .then(response => {dispatch(addComment(response));alert(response)})
        .catch(error => {
            console.log('Post feedback: ' + error.message);
            alert('Feedback could not be posted:\n' + error.message)
        })
};