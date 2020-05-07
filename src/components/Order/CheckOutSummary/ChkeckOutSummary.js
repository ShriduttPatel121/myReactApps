import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.css';
const CheckOutSummary =  (props) =>{
    return(
        <div className={classes.CheckOutSummary}>
            <h1>We Hope you like it!!!!!</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkOutCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkOutContinue}>CONFIRM</Button>
        </div>
    );
};
export default CheckOutSummary;