import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'; 
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        purchasable : false,
        purchasing : false,
        
    };

    componentDidMount(){
        this.props.onInitIngredient();
    }
    updatePurchasableState(ingredient){
         const sum = Object.keys(ingredient)
                        .map(igKey => ingredient[igKey])
                        .reduce((sum,ele)=> sum +=ele, 0);
                return sum > 0
    }
    purchaseHandler = () =>{
        if(this.props.isAuth){
            this.setState({purchasing:true});
          }
        else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth'); 
        }
    }
    closeModal = () =>{
        this.setState({purchasing:false});
    }
     
    purchaseContiHandler = () =>{
         this.props.onInitPurchase();
         this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if(this.state.loading){
             orderSummary = <Spinner/>;
        }
        let burger = this.props.error? <p>Sorry, due to some issue, application was not able to load ingredients.</p>:<Spinner/>;
        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredients={this.props.ings}>
                                </Burger>
                <BuildControls ordered={this.purchaseHandler} 
                            purchasable={this.updatePurchasableState(this.props.ings)} 
                            price={this.props.price} 
                            disable={disabledInfo} 
                            isAuth = {this.props.isAuth}
                            ingredientAdd={this.props.onIngredientAdded} 
                            ingredientRemoved={this.props.onIngredientRemoved}/>
                </Aux>
                );
                orderSummary = <OrderSummary 
                                cnfClicked={this.purchaseContiHandler} 
                                cnclClick={this.closeModal} 
                                ingredients={this.props.ings} 
                                price={this.props.price}>
                                    
                                </OrderSummary>;
        }
        return (
            <Aux> 
                <Modal modalclosed={this.closeModal} show={this.state.purchasing}>
                {orderSummary}
                </Modal>
                
                <div>
                    {burger}
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuth : state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded : (ing) => dispatch(actions.addIngredient(ing)),
        onIngredientRemoved : (ing) => dispatch(actions.removeIngredient (ing)),
        onInitIngredient : () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath : (path) => dispatch(actions.setAuthRedirect(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErorHandler(BurgerBuilder, axios));