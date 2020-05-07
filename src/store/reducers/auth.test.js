import reducer from './auth';
import * as actionTypes from '../actions/actionTypes' ;

describe('auth reducer', () => {
    it('it should return initail state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                token : null,
                loading : false,
                error : null,
                userId : null,
                authRedirect : "/"
            }
        )
    });
    it('should store token on login', () =>{
        expect(reducer({
            token : null,
            loading : false,
            error : null,
            userId : null,
            authRedirect : "/"
        }, {
            type : actionTypes.AUTH_SUCCESS,
            idToken : 'some-token',
            userId : 'userId'
        })).toEqual(
            {
            token : 'some-token',
            loading : false,
            error : null,
            userId : 'userId',
            authRedirect : "/"
            }
        )
    })
}); 
