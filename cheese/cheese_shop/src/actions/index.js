
export const SEARCH_CHEESE = 'SEARCH_CHEESE'

export function selectCheese(cheese){
    return {
        type : SEARCH_CHEESE,
        payload : cheese
    };
}