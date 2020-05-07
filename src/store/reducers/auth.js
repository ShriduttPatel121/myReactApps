import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token : null,
    loading : false,
    error : null,
    userId : null,
    authRedirect : "/"
}
const autStart = (state, action) =>{
    return updateObject(state,{error : null, loading : true});
}
const authSuccess = (state, action) => {
    return updateObject(state,{
        token : action.idToken,
        userId : action.userId,
        error : null,
        loading : false
    })
}
const authfail = (state, action) => {
    return updateObject(state,{
        error : action.error,
        loading : false
    });
}
 const setRedirectPath = (state, action) =>{
     return updateObject(state, {authRedirect : action.path})
 }

const AuthLogout = (state, action) =>{
    return updateObject(state, {token : null, userId : null});
}
const reducer = (state = initialState,action) =>{
    switch (action.type) {
        case actionTypes.AUTH_START: return autStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authfail(state, action);
        case actionTypes.AUTH_LOGOUT: return AuthLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setRedirectPath(state,action);
        default:
            return state;
    }
}

export default reducer;