/**
 * Created by wumingli on 2016/11/22.
 */
import React from 'react';
import Fetch from 'react-fetch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import List from './List';
import Header from './Header';
import Nav from './Nav';

require('../styles/main.scss');

injectTapEventPlugin();

let jsonDataUrl = '/mock/list.json';

if (process.env.NODE_ENV === 'production') {
  jsonDataUrl = './list.json';
}

const Main = () => (
    <div>
        <Header />
        <Nav
          router="add"
          title="已有品类列表"
          btnTitle="新增品类"
          type="home"
        />
        <MuiThemeProvider>
            <Fetch url={jsonDataUrl}>
                <List />
            </Fetch>
        </MuiThemeProvider>
    </div>
);

export default Main;
