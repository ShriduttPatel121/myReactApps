import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo'; 
import NavigationItems from '../NavigationItems/NavigationItemes';
import DrawerToggle from '../SideDrawer/DraweToggle/DrawerToggle';
const Toolbar =  (props) =>{
        return(
            <header className = {classes.Toolbar}>
                <DrawerToggle clicked={props.DrawerToggleClicked}/>
                
                <div className={classes.Logo}>    
                <Logo/>
                </div>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuthenticated = {props.isAuth}/>
                </nav>
            </header>
        );
};
export default Toolbar;