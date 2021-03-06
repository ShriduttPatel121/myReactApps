import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../BackDrop/BackDrop';
class modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children ;
    }
    render() {
        return (
            <Aux>
            <BackDrop shows ={this.props.show} Bpclicked={this.props.modalclosed}/>
            <div className={classes.Modal}
            style={{transform : this.props.show ? 'translateY(0)': 'translateY(-100vh)',
                            opacity : this.props.show? '1': '0'
                    }}>
                {this.props.children}
            </div>
            </Aux> 
        );
    }
} 
export default modal;