import {SEARCH_CHEESE,
        SELECT_CHEESE
} from '../actions/index'

//local state, not global
export default function(state = null, action){
    switch(action.type){
        case SEARCH_CHEESE:
            return action.payload;
        case SELECT_CHEESE:
            return action.payload;
        default:
            console.log("Impossible actions")
    }
    return state
}