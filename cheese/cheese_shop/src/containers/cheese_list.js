import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectCheese} from '../actions/index';
import {bindActionCreators} from 'redux';

import _ from '../htmlDecode'

class CheeseList extends Component{
    
    getList(){
        if(!this.props.Cheeses[0]){
            console.log("Nothign in list")
            return <div></div>
        }
        //console.log(this.props.Cheeses[0])

        return (
            this.props.Cheeses[0].map( cheeseItem => {
                return <li
                key={_(cheeseItem.Name)}
                className={"list-group-item"}
                onClick={() => this.props.selectCheese(cheeseItem)}
                >{_(cheeseItem.Name)}</li>
            })
            //<li></li>
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
    //console.log("dispatching select Cheese")
    return bindActionCreators({selectCheese : selectCheese}, dispatch)
}

/*function mapStateToProps(state){
    //whatever is returns becomes props in CheeseList
    return {
        Cheeses: state.Cheeses
    };
}*/

function mapStateToProps({Cheeses}) {
    return {Cheeses};
} 

            //takes a function and a data type and assigns to props as state
export default connect(mapStateToProps, matchDispatchToProps)(CheeseList)