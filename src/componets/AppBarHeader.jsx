import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import logo from '../ZopNow-logo.svg';
import SortIconMenu from './SortIconMenu';

const AppBarHeader = () => (
  <AppBar
    style = {{marginBottom: "15px"}}
    iconElementLeft={<IconButton><img src={logo} alt="" /></IconButton>}
    iconElementRight={<SortIconMenu/>}
  />
);

export default AppBarHeader;