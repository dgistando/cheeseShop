import React, { Component } from 'react';
import './App.css';

import CheeseList from '../containers/cheese_list'

class App extends Component {
  render() {
    return (
      <div>
       <CheeseList />
      </div>
    );
  }
}

export default App;
