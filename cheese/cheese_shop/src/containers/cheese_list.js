import React, {Component} from 'react';
import {connect} from 'react-redux';

class CheeseList extends Component{
    
    getList(){
        return (
            this.props.Cheese.map( cheeseItem => {
                return <li key={cheeseItem.name} className={"list-group-item"}>{cheeseItem.name}</li>
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

function mapStateToProps(state){
    //whatever is returns becomes props in booklist
    return {
        Cheese: state.Cheese
    };
}
            //takes a function and a data type and assigns to props as state
export default connect(mapStateToProps)(CheeseList)