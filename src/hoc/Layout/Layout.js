import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
class Layout extends Component{
    state ={
        showSideDrawer : false,
    }
    /* sideDrawerToggleHandler = () =>{
        this.setState( (preState)=> { return {showSideDrawer: !preState.showSideDrawer}});
    } */
    render(){
        
        return(<Aux>
            <Toolbar isAuth ={this.props.isAuthenticated} DrawerToggleClicked={this.props.onOpenSideDrawer}/>
            <SideDrawer isAuth ={this.props.isAuthenticated}  closed={this.props.onCloseSideDrawer}/>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
            </Aux>);
    }
}
const mapStateToProps = state =>{
    return{
         isAuthenticated : state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOpenSideDrawer : () => dispatch({type: actionTypes.OPEN_SIDEDRAWER}),
        onCloseSideDrawer : () => dispatch({type: actionTypes.CLOSE_SIDEDRAWER})

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);