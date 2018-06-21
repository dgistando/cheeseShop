import React, {Component} from 'react';
import {connect} from 'react-redux';

class CheeseDetail extends Component{

    render(){
        if(!this.props.Cheese)return <div></div>;

        return(
            <div>
                <h3>{this.props.Cheese.name}</h3>
                <div>colour : {this.props.Cheese.colour}</div>
            </div> 
        );
    }
}

function mapStateToProps(state){
    return {
        Cheese : state.ActiveCheese
    };
}

export default connect(mapStateToProps)(CheeseDetail)