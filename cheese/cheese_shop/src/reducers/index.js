import {combineReducers} from 'redux';
import CheeseReducer from './reducer_cheese'

const rootReducer = combineReducers({
    //this is part of the global app state
    //so we can use cheese wherever
    Cheese : CheeseReducer
})

export default rootReducer;