import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCheese} from '../actions/index';
import {bindActionCreators} from 'redux';

class CheeseList extends Component{
    
    getList(){
        return (
            this.props.Cheese.map( cheeseItem => {
                return <li
                key={cheeseItem.name}
                className={"list-group-item"}
                onClick={() => this.props.selectCheese(cheeseItem)}
                >{cheeseItem.name}</li>
            })
        )
    }

    render(){
        return(
            <ul className={"list-group col-sm-4"}>
                {this.getList()}
            </ul>
        )
    }
}

//Anything that comes from here becomes props in list
function matchDispatchToProps(dispatch){
    //when selectedCheese is called is comes here and is passed to the reducers
    return bindActionCreators({selectCheese : selectCheese}, dispatch)
}

function mapStateToProps(state){
    //whatever is returns becomes props in booklist
    return {
        Cheese: state.Cheese
    };
}
            //takes a function and a data type and assigns to props as state
export default connect(mapStateToProps, matchDispatchToProps)(CheeseList)