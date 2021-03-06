import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Leaders} from './leaders';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import {InitialFeedback} from './form';
export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dishes:Dishes,
			leaders:Leaders,
			comments:Comments,
			promotions:Promotions,
			...createForms({
				feedback: InitialFeedback
			})
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
};