import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
class Orders extends Component {

    componentDidMount(){
        this.props.onLoadFetchOrders(this.props.token, this.props.userId );
    }
    render() {
        let orders = <Spinner/>;
        if(!this.props.loading)
        {
            orders = this.props.orders.map(order => <Order key ={order.id} 
                ingredients={order.ingredients}
                price = {order.price}
                />)
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
};
const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId 
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErorHandler(Orders, axios));