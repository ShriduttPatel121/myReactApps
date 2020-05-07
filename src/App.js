import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
 import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BuergerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const  asyncCheckOut = asyncComponent(() => {
    return import('./containers/CheckOut/CheckOut');
});

const  asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const  asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/auth')
});


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  };
  render() {
    let routes = (
      <Switch>
      <Route path="/auth" component={asyncAuth}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
      </Switch>
    );
    if (this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckOut}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/orders" exact component={asyncOrders}/>
          <Redirect to="/"/>
      </Switch>
      );
    }
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
    
  }
}

const mapStateToProps = state =>{
  return {
    isAuth : state.auth.token !== null
  }
}
const  mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  };
}
//https://shridutt-s-burger.firebaseio.com/
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));





