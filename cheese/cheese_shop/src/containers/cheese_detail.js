import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image} from 'react-bootstrap';

import _ from '../htmlDecode'

class CheeseDetail extends Component{

    //I kno this is garbage, but its one line. XDDD
    extractValidData(){ return Object.keys(this.props.Cheese).slice(2).map( detail => !this.props.Cheese[detail] ? <div key={detail} /> : <div key={detail}>{detail +": "+ this.props.Cheese[detail]}</div>)}
    
    /*Here's the more readable version
    extractValidData(){
        return (
            Object.keys(this.props.Cheese).slice(2).map( detail => {
                if(!this.props.Cheese[detail]){
                    return <div></div>
                }else{
                    return <div>{detail +": "+ this.props.Cheese[detail]}</div>
                }
            })
        )
    }*/

    render(){
        if(!this.props.Cheese)return <div></div>;

        return(
            <div>
                <h3>{_(this.props.Cheese.Name)}</h3>
                <Image  src={require('../cheeseShop_images'+this.props.Cheese.Img)} height="300" width="300" responsive />
                <div>{this.extractValidData()}</div>
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