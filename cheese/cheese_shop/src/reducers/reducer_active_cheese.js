//local state, not global
export default function(state = null, action){
    switch(action.type){
        case'CHEESE_SELECTED':
            return action.payload;
        default:
            console.log("Impossible actions")
    }
    return state
}