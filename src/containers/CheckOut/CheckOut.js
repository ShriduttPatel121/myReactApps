import React, { Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/ChkeckOutSummary';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
/* import * as action from '../../store/actions/index' */
class CheckOut extends Component {   
   
          checkOutCancel= () =>{
                this.props.history.goBack();
          }
          checkOutContinue = () =>{
                this.props.history.replace('/checkout/contact-data');
          }

    render() {
        let  summay = (< Redirect to = "/"/>);
        
        if (this.props.ings)
        {
            const purchasedRedirect = this.props.purchased?<Redirect to = "/"/> : null
            summay = (
                <div>
                    {purchasedRedirect}
                    <CheckOutSummary ingredients={this.props.ings} 
                    checkOutCancel={this.checkOutCancel}
                    checkOutContinue = {this.checkOutContinue}
                    />
                    <Route path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
                </div>
                )
        }
        
        return summay;
    }
}

const mapStateToState = state =>{
    return{
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}
export default connect(mapStateToState)(CheckOut);