import React, { Component } from 'react';
import './App.css';
import ProductLists from './componets/ProductLists';
import 'antd/dist/antd.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarHeader from './componets/AppBarHeader';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBarHeader />
          <ProductLists />
        </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
