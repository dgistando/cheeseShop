import React, { Component } from 'react';
import './App.css';

import CheeseList from '../containers/cheese_list'
import CheeseDetail from '../containers/cheese_detail'
import DynamicSearch from '../containers/search_parameters'

class App extends Component {
  render() {
    return (
      <div className="container">
        <DynamicSearch />
        <div className="main">
          <CheeseList />
          <CheeseDetail />
        </div>
      </div>
    );
  }
}

export default App;
