import React, {Component} from 'react';
import './App.css';
import ZipCity from './components/ZipCity.js';

class App extends Component{
  render(){
    return (
      <>
          <h1 className="App-header"> Zip Code Search</h1>
          <ZipCity />
      </>
        
      );
  }  
}

export default App;
