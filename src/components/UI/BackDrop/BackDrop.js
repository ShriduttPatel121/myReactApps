import React from 'react';
import classes from './BackDrop.css';

const BackDrop =  (props) =>{
        return(
            props.shows ?<div className={classes.BackDrop} onClick={props.Bpclicked}></div>:null
        );           
};
export default BackDrop;