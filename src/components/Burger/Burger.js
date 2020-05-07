import React from 'react';
import classes from './Burger.css';
import BugerIngredient from './BurgerIngredient/BurgerIngredient';
import {withRouter } from 'react-router-dom'
//import { object } from 'prop-types';
const burger =  (props) =>{
    let transformedIngredient =Object.keys(props.ingredients)
    .map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((__,i)=> <BugerIngredient key ={igKey+i} type={igKey}></BugerIngredient>);
    }).reduce((arry,el)=> arry.concat(el),[]);
   
    if (transformedIngredient.length === 0){
        const emoji = String.fromCodePoint(0x1F60B);
        transformedIngredient = <p> Add some ingredients to make it tasty {emoji} </p>
    }
    return (
        <div className={classes.Burger}>
            <BugerIngredient type = "bread-top"/>
            {transformedIngredient}
            <BugerIngredient type = "bread-bottom"/>
        </div>
    );
                             
};
export default withRouter(burger);