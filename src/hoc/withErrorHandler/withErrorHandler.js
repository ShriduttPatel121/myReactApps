import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
const withErorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        _isMounted = false;
        state = {
            error: null
        }
        componentDidMount (){

            this.reqInterceptor = axios.interceptors.request.use( req =>{
                this.setState({error:null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({error:error});
            })
        }
        errorConfirmedHandler =() =>{
            this.setState({error:null});
        }
        componentWillUnmount(){
            this._isMounted = false;
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
        }
        render()
        {

            return (
                <Aux>
            <Modal show={this.state.error} modalclosed={this.errorConfirmedHandler}>
                {this.state.error? this.state.error.message: <p>Oops, somthing went wrong!!!</p>}
            </Modal>
            <WrappedComponent {...this.props}/>
            </Aux>
            );
        }
    }
} 
export default withErorHandler;