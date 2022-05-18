import { applyMiddleware, createStore, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import { products, product } from '../reducers/reducers';
import thunk from 'redux-thunk';

const initState = {};
export const history = createHashHistory();

const initReducer = (history) => combineReducers({
    router: connectRouter(history),
    products,
    product
});

const store = createStore(
    initReducer(history),
    initState,
    applyMiddleware(
        routerMiddleware(history),
        thunk
    ),
)

export default store;