import React, { Component } from 'react';
import './App.css';

import CheeseList from '../containers/cheese_list'
import CheeseDetail from '../containers/cheese_detail'

class App extends Component {
  render() {
    return (
      <div>
       <CheeseList />
       <CheeseDetail />
      </div>
    );
  }
}

export default App;
