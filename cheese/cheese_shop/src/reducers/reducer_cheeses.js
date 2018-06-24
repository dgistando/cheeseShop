import {SEARCH_CHEESE,
    SELECT_CHEESE
} from '../actions/index'

export default function(state = [], action){
    
    switch(action.type){
        case SEARCH_CHEESE:
            console.log("Ations search")
            //return [action.payload.data];//This will replace the entire state with the new stuff.
            //return state.push(action.payload.data) //cant manipulate state like this.Its unethical and dangerous
            return [action.payload.data.Search];//[action.payload.data, ...state]//adds to array saftly everytime
        /*case SELECT_CHEESE:
            console.log(state + "selected")
            return action.payload;
        default:
            console.log("Impossible actions")*/
    }

    //console.log("Ever reached??????")
    return state;
}
//TODO Maybe this should call an action and return some initial data
//For the first reducer