import React from 'react';
import BurgerLogo from '../../assets/Images/burger-logo.png';
import classes from './Logo.css';
const Logo =  (props) =>{
        return(
            <div className={classes.Logo} style={{height:props.height}}>
                <img src={BurgerLogo} alt="Burger"></img>
            </div>
        );
};
export default Logo;