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
                      title : 'Search'}
        this.handleSelect = this.handleSelect.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event){
        this.setState({term : event.target.value})
        //console.log(event.target.value)
    }

    onFormSubmit(event){
        event.preventDefault()

        //console.log(this.state.term)

        //After this is pressed, the CheeseList needs to update
        //Not sure yet how to do it. Just watch the rest of the video.
        this.props.searchCheese(this.state.term)
        //this.setState({ term : ''})//Dont nned to clear searchbox
    }

    handleSelect(eventKey){
        this.setState({title:eventKey})

        switch(eventKey){
            case('Name') :
             console.log("Name selected")
            break; 
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
                    <FormControl type="text"
                                 placeholder="Search"
                                 value={this.state.term}
                                 onChange={this.onInputChange} />
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