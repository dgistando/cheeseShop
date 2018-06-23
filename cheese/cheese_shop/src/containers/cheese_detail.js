import React, {Component} from 'react';
import {connect} from 'react-redux';

class CheeseDetail extends Component{

    render(){
        if(!this.props.Cheese)return <div></div>;

        //<div>Type : {this.props.Cheese.other.Type}</div>

        return(
            <div>
                <h3>{this.props.Cheese.Name}</h3>
                
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