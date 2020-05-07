import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label : 'Salad', type : 'Salad'},
    {label : 'Spacial Sauce', type : 'Spacial_Sauce'},
    {label : 'cheese', type : 'Cheese'},
    {label : 'veg. patty', type : 'Patty'}
];
const buildControls =  (props) =>{
    const rupee = String.fromCodePoint(0x20B9);
    return (
        <div className={classes.BuildControls}>
        <p>Current price: {rupee}{props.price}</p>
            {controls.map(ctrl => (
                <BuildControl disableq={props.disable[ctrl.type]} key={ctrl.label} label={ctrl.label} added={() => props.ingredientAdd(ctrl.type)} removed={()=>props.ingredientRemoved(ctrl.type)}></BuildControl>
            ))}
            <button 
                disabled={!props.purchasable} 
                className={classes.OrderButton} 
                onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'Signin to order'}</button>
        </div>
    );
                             
};
export default buildControls;