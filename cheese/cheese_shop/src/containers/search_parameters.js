import React, {Component} from 'react';
import {SplitButton, MenuItem, Navbar, FormGroup, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {searchCheese} from '../actions/index';



/**
 *  My plan for this class is to give the option to search 
 *  many different ways. I want the search bar to change depending on what 
 *  type of search is selected. Right noow its just text based.
 * 
 *  Furture :
 * 
 *  -if the search type if Letter then [A][B][C]... will display
 *  instead of a search bar.
 * 
 *  -search by more than one way at once
 *  [Search          ]
 *  [A][B][C]...
 */

class DynamicSearch extends Component{

    constructor(props){
        super(props);
        this.state = {term : '',
                      title : 'Name'}
        this.handleSelect = this.handleSelect.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.nonFormSubmit = this.nonFormSubmit.bind(this);
    }

    onInputChange(event){
        this.setState({term : event.target.value})
        //console.log(event.target.value)
    }

    onFormSubmit(event){
        event.preventDefault()

        //After this is pressed, the CheeseList needs to update
        //Not sure yet how to do it. Just watch the rest of the video.
        this.props.searchCheese(this.state.term)
        //this.setState({ term : ''})//Dont nned to clear searchbox
    }

    nonFormSubmit(Letter){
        console.log(Letter.letter)
    }

    handleSelect(eventKey){
        this.setState({title:eventKey})
    }


    getNameSearch(){
        return (
            <FormControl type="text"
            placeholder="Search"
            value={this.state.term}
            onChange={this.onInputChange} />
        );
    }

    getLetterSearch(){
       const alphabet = returnAlphabetObject();
    
    //TODO, Make toggle button group instead. It already flexes... smh
    return(
            <ul className="flex-container wrap">
                {alphabet.map(Letter =>{
                    return (
                        <li className="flex-item" key={Letter.letter}>
                            <a href='#' onClick={() => this.nonFormSubmit(Letter)}>{Letter.letter}</a>
                        </li>
                    )   
                })}
            </ul>
        )

    }

    getFeelSearch(){
        return <div>Feel Search</div>
    }

    getAllCheese(){
        return <div>1831 Cheeses Loaded</div>
    }

    renderSearch(type){

        switch(type){
            case('Name') :
             console.log("Name selected")
             return this.getNameSearch();
            case('Letter') :
             console.log("Letter selected")
             return this.getLetterSearch();
            case('Feel') :
             console.log("Feel selected")
             return this.getFeelSearch();
            case('All Cheese') :
             console.log("All Cheese selected")
             return this.getAllCheese();
        }
    }

    render(){
        return (
            <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                <a href="#home">CheeseShop</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Navbar.Form pullLeft>
                <form onSubmit={this.onFormSubmit}>
                <FormGroup>
                    {this.renderSearch(this.state.title)}
                </FormGroup>{' '}
                    <SplitButton
                        bsStyle={'primary'}
                        title={this.state.title}
                        key={1}
                        id={`split-button-basic-${1}`}
                        onClick={this.onFormSubmit}
                        >
                            <MenuItem onSelect={this.handleSelect} eventKey="Name">Name</MenuItem>
                            <MenuItem onSelect={this.handleSelect} eventKey="Letter">Letter</MenuItem>
                            <MenuItem onSelect={this.handleSelect} eventKey="Feel">Feel</MenuItem>
                            <MenuItem divider />
                            <MenuItem onSelect={this.handleSelect} eventKey="All Cheese">All Cheese</MenuItem>
                    </SplitButton>
                    </form>
                </Navbar.Form>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapDispatchtoProps(dispatch){
    return bindActionCreators({searchCheese}, dispatch)
}
                    //dont need to pass in state here
export default connect(null, mapDispatchtoProps)(DynamicSearch)

function returnAlphabetObject(){
    return(
        [
            {letter :'A',
              selected : false
          },{letter:'B',
              selected : false
          },{letter:'C',
              selected : false
          },{letter:'D',
              selected : false
          },{letter:'E',
              selected : false
          },{letter:'F',
              selected : false
          },{letter:'G',
              selected : false
          },{letter:'H',
              selected : false
          },{letter:'I',
              selected : false
          },{letter:'J',
              selected : false
          },{letter:'K',
              selected : false
          },{letter:'L',
              selected : false
          },{letter:'M',
              selected : false
          },{letter:'N',
              selected : false
          },{letter:'O',
              selected : false
          },{letter:'P',
              selected : false
          },{letter:'Q',
              selected : false
          },{letter:'R',
              selected : false
          },{letter:'S',
              selected : false
          },{letter:'T',
              selected : false
          },{letter:'U',
              selected : false
          },{letter:'V',
              selected : false
          },{letter:'W',
              selected : false
          },{letter:'X',
              selected : false
          },{letter:'Y',
              selected : false
          },{letter :'Z',
              selected : false}]
    )
}