import React from 'react';
import classes from './Order.css';
const Order =  (props) =>{
    const rupee = String.fromCodePoint(0x20B9);
    const ingredients = [];
    for( let ingredientName in props.ingredients){
        ingredients.push({
                amount: props.ingredients[ingredientName],
                name : ingredientName.toString() === 'Spacial_Sauce' ? 'Spacial sauce' : ingredientName.toString()
            });
    }
    const ingredientOutput = ingredients.map( ig =>{
        return <span 
        style = {{textTransform: 'capitalize', display: 'inline-block', margin: '2px 8px', border: '1px solid #ccc', padding: '5px'}}
        key={ig.name}>{ig.name}: {ig.amount}</span>;
    })
    return(
            <div className= {classes.Order}>
                <p> {ingredientOutput}</p>
                <p>Price : <strong>{rupee} {props.price}</strong></p>
            </div>);
};
export default Order;