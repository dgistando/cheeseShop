import {combineReducers} from 'redux';
import CheeseReducer from './reducer_cheese'
import activeCheese from './reducer_active_cheese'

const rootReducer = combineReducers({
    //this is part of the global app state
    //so we can use cheese wherever
    Cheese : CheeseReducer,
    ActiveCheese : activeCheese
})

export default rootReducer;