import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
const INGREDIENT_PRICE = {
    "Salad" : 15,
    "Cheese" : 25,
     "Patty" : 50,
    "Spacial_Sauce" : 60
}
export const addIngredient = (name) =>{
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name,
        built : true
    }
};

export const removeIngredient = (name) =>{
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
};

export const setIngrediets = (ingredients, amount) =>{
     return {
         type: actionTypes.SET_INGREDIENTS,
         ingredients : ingredients,
         amount : amount
     }
}

export const fetchIngredientFailed = () =>{
    return{
        type : actionTypes.FETCH_INGREDIENT_FAIL
    }
}
export const initIngredient = () =>{
    return dispatch => {
        axios.get('/Ingredients.json')
        .then(response => {
            const ingredients = {
                ...response.data
            };
             
            let currentPrice = Object.keys(ingredients).reduce((acc,cur) =>{
                    acc += (INGREDIENT_PRICE[cur]*ingredients[cur]);
                    return acc;
                },25);
                dispatch(setIngrediets(ingredients, currentPrice))

        }).catch( error =>{
            dispatch(fetchIngredientFailed());
        });
    }
}