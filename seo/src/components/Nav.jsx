'use strict';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';

const homeIconStyle = {
    color: '#fff',
    marginTop: 13
};
const Nav = (props) => (
    <MuiThemeProvider>
        <AppBar
            title={props.title || '导航标题'}
            iconElementRight={
                <Link to={props.router || '/'}>
                    <RaisedButton label={props.btnTitle || '右侧按钮标题'} style={{marginTop: 7}}/>
                </Link>
            }
            iconElementLeft={
                props.type === 'home' ? <FontIcon className="material-icons" style={homeIconStyle}>{props.navIcon || 'home'}</FontIcon> : null
            }
        />
    </MuiThemeProvider>
);

export default Nav;