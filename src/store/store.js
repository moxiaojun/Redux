import {createStore} from "../redux";
import combineReducers from "./combineReducers"

import counter from '../reducers/Counter';
import todo from '../reducers/Todo';

let reducer = combineReducers({
    counter,
    todo});
let store = createStore(reducer);
export {store};