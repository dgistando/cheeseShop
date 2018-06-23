import {SEARCH_CHEESE,
    SELECT_CHEESE
} from '../actions/index'

export default function(state = [], action){
    //console.log("Action received", action);
    
    switch(action.type){
        case SEARCH_CHEESE:
            //return [action.payload.data];//This will replace the entire state with the new stuff.
            //return state.push(action.payload.data) //cant manipulate state like this.Its unethical and dangerous
            return [action.payload.data.Search];//[action.payload.data, ...state]//adds to array saftly everytime
        case SELECT_CHEESE:
            return action.payload;
        default:
            console.log("Impossible actions")
    }

    return state;
    /*return [
        {name : "No Cheese Yet", other : {} }
    ];*/
}
//TODO Maybe this should call an action and return some initial data
//For the first reducer