import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
const initialState = {
    ingredients: null,
    error: false,
        totalPrice : 25,
        open : false,
        built : false
}
const INGREDIENT_PRICE = {
    "Salad" : 15,
    "Cheese" : 25,
     "Patty": 50,
    "Spacial_Sauce" : 60
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updateState = {
                ingredients : updatedIngredients,
                totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                built : true
                }
            return updateObject(state, updateState)
        
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1}
            const updatedIngs = updateObject(state.ingredients, updatedIng)
            let isBurgerEmpty = true;
            for (let x in updatedIngs){
                if ( updatedIngs[x] >= 1)
                {
                    isBurgerEmpty =false;
                    break;
                }
            }
            const updateSta = {
                ingredients : updatedIngs,
                totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                built : !isBurgerEmpty
                }
            return updateObject(state, updateSta)
        
        case actionTypes.CLOSE_SIDEDRAWER:
            return updateObject(state,{open : false});
        
        case actionTypes.OPEN_SIDEDRAWER:
                return updateObject(state,{open : true});
        
        case actionTypes.SET_INGREDIENTS:
            let isEmpty = true;
            for (let x in action.ingredients){
                if ( action.ingredients[x] >= 1)
                {
                    isEmpty =false;
                    break;
                }
            }
                return updateObject(state, {
                        ingredients: action.ingredients,
                        totalPrice : action.amount,
                        error: false,
                        built : !isEmpty
                        });

        case actionTypes.FETCH_INGREDIENT_FAIL:
                return updateObject(state, {error:true});
        
        default:
            return state;
    }
    
}

export default reducer;