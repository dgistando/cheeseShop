import {combineReducers} from 'redux';
import CheeseReducer from './reducer_cheeses'
import activeCheese from './reducer_active_cheese'

const rootReducer = combineReducers({
    //this is part of the global app state
    //so we can use cheese wherever
    Cheeses : CheeseReducer, //TODO make this some initial value. Maybe get 5 random ones
    ActiveCheese : activeCheese
})

export default rootReducer;