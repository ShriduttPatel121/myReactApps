import React, {Component} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItemes';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux/Aux';
import { connect } from 'react-redux';
class SideDrawer extends Component{
     attachclasses = [classes.SideDrawer, classes.Close];
     check = this.props.open;    
    if(_check)
    {  
        this.attachclasses = [classes.SideDrawer, classes.Open] ;
    }
    render()
    {
        return(<Aux>
            <BackDrop shows={this.props.open} Bpclicked={this.props.closed}/>
            <div className={this.props.open? [classes.SideDrawer, classes.Open].join(' '): [classes.SideDrawer, classes.Close].join(' ')}>
                <div className={classes.Logo}>
                <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {this.props.isAuth}/>
                </nav>
            </div>
            </Aux>);
    }

};

const mapStateToProps = state =>{
    return{
        open : state.burgerBuilder.open
    }
}

export default connect(mapStateToProps)(SideDrawer);