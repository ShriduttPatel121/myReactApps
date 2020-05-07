import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility';
class ContactData extends Component {
    state = {
        orderForm: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value: '',
                validation: {
                    required : true
                },valid : false,
                touched: false
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'street'
                },
                value: '',
                validation: {
                    required : true
                },valid : false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type : 'number',
                    placeholder : 'zip-code or pin-code'
                },
                value: '',
                validation: {
                    required : true,
                    minLangth: 6,
                    maxLangth: 6
                },valid : false,
                touched: false
            },country:{
                elementType: 'input',
                elementConfig: {
                    type : 'text',
                    placeholder : 'Country'
                },
                value: '',
                validation: {
                    required : true
                },valid : false,
                touched: false
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type : 'email',
                    placeholder : 'your mail id'
                },
                value: '',
                validation: {
                    required : true,
                    isEmail : true
                },valid : false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', display : 'fastest'},
                              {value: 'cheapest', display : 'cheapest'}]
                },
                value: 'fastest',
                valid: true,
                validation: {} 
            }
        },
        formIsValid : false,
    }
    orderHandler = (event) =>{
         event.preventDefault();
         const formData = {};
         for (let formElementIdentifier in this.state.orderForm){
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;

         }
         const order = {
             ingredients : this.props.ings,
             price: this.props.price,
             orderData : formData,
             userId : this.props.userId
         } 
         this.props.onOrderBurger(order,this.props.token);
    }
    inputChanged= (event, inputIdentifier) =>{
        
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
            value : event.target.value,
            valid : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched : true
        });
        const form = updateObject(this.state.orderForm, {
            [inputIdentifier] : updatedFormElement
        } );
        form[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for ( let inputIdentifier in form){
            formIsValid = form[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:form, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for( let key in this.state.orderForm ){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],

            });
        }
        let form =(<form>
            {
                formElementsArray.map(formElement => <Input 
                                                        key = {formElement.id}
                                                        elementType={formElement.config.elementType}
                                                        elementConfig = {formElement.config.elementConfig}
                                                        value = {formElement.config.value}
                                                         changed ={(event) =>this.inputChanged(event,formElement.id)}
                                                         invalid ={!formElement.config.valid}
                                                         shouldValidate = {formElement.config.validation}
                                                         touched = {formElement.config.touched}    
                                                         />)
            }
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
        </form>);
        if (this.props.loading){
            form = (<Spinner bColor ="#f2b830"/>);
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token)),

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErorHandler(ContactData,axios));