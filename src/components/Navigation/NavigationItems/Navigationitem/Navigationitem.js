import React from 'react';
import classes from './NavigationItem.css'; 
import {NavLink} from 'react-router-dom'
import * as actionType from '../../../../store/actions/actionTypes';
import { connect } from 'react-redux';
const NavigationItem =  (props) =>{  
    return(
            <li onClick={props.whenClicked} className={classes.NavigationItem}>
                <NavLink
                to={props.link} exact={props.exact}
                activeClassName={classes.active}>
                {props.children}
                </NavLink>
            </li>            
        );
};
const mapDispatchToProps = dispatch => {
    return{
        whenClicked : () => dispatch({type: actionType.CLOSE_SIDEDRAWER})
    }
}
export default connect(null,mapDispatchToProps)(NavigationItem);