import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
    
    render() {
        let Ingredient = Object.keys(this.props.ingredients)
        .map( igKey => {
            if(igKey === 'Spacial_Sauce')
            {igKey = 'Spacial Sauce';}
            
            return igKey;
        } )
    const ingredients = Ingredient.map(igKey => { 
        let Key = '';
        if (igKey === 'Spacial Sauce'){
            Key = 'Spacial_Sauce';
        }else{
            Key = igKey;
        }
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey} </span>: {this.props.ingredients[Key]}</li>})
        const rupee = String.fromCodePoint(0x20B9);
        
        return (
            <Aux>
                <h3>Your order</h3>
                 <p>Your delicious Burger has</p>
                <ul>
                    {ingredients}  
                </ul>
                <p>Continue to Checkout?</p>
                <h4>Amount: {rupee} {this.props.price}</h4>
            <Button btnType={"Danger"} clicked={this.props.cnclClick}>Cancle</Button>
            <Button btnType={"Success"} clicked = {this.props.cnfClicked}>Confirm</Button>
        </Aux>
        );
    }
};
export default OrderSummary;