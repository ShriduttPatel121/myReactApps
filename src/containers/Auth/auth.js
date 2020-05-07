import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    /* constructor(props) {
        super(props);
      } */
    state = {
        controls:{
            email:{
            elementType: 'input',
            elementConfig: {
                type : 'text',
                placeholder : 'mail address'
            },
            value: '',
            validation: {
                required : true,
                isEmail: true,
            },valid : false,
            touched: false
        },
        password:{
            elementType: 'input',
            elementConfig: {
                type : 'password',
                placeholder : 'password'
            },
            value: '',
            validation: {
                required : true,
                minLength: 7,
            },valid : false,
            touched: false
        }
    },
    isSignup : true
    }
    
    componentDidMount (){
        if(!this.props.built && this.props.authRedirect !== '/')
        {   
            this.props.onsetRedirectPath();
        }
    };
    switchAuthModeHandler =  () =>{
        this.setState(preState => {
            return {isSignup : !preState.isSignup};
        });
    }
    
    inputChangedHandler = (event, controlName)=>{
        const updatedConstrols = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName],{
                value : event.target.value,
                valid : checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched : true,
            })
        });
            this.setState({controls : updatedConstrols});
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value, this.state.isSignup);
    }
    render() {
        const formElementsArray = [];
        for( let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],

            });
        }
        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    changed ={(event) =>this.inputChangedHandler(event,formElement.id)}
                    invalid ={!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}/>   
                                                         
            )
        );
        if (this.props.loading)
        {
            form = <Spinner bColor="#f6e4cb"/>
        }
        let errorMessage = null;
        if (this.props.error)
        {
            errorMessage = (
                <p style={{color:'darkred'}}>{this.props.error}</p>
            );
        }
        let authRedirect = null;
        if (this.props.isAuth)
        {
            authRedirect = <Redirect to={this.props.authRedirect}/>;
        }
        return (
            <div className = {classes.Auth}>
                {authRedirect}
                <strong style={{color: 'darkslategray'}}>{this.state.isSignup? "Signup form" : "Signin form"}</strong>
                {errorMessage}
                <form onSubmit = {this.onSubmitHandler}>
                    {form}
                    <Button btnType ={"Success"}>SUBMIT</Button>
                </form>
                <Button clicked = {this.switchAuthModeHandler} btnType ="Danger">SWITCH IT TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToprops = state =>{
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuth : state.auth.token !== null,
        built : state.burgerBuilder.built,
        authRedirect : state.auth.authRedirect
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onAuth : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onsetRedirectPath : () => dispatch(actions.setAuthRedirect('/'))
    }
}

export default connect(mapStateToprops,mapDispatchToProps)(Auth);