/**
 * Created by wumingli on 2016/11/22.
 */
import React from 'react';
import List from './List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Header from './Header';
import Fetch from 'react-fetch';
import Nav from './Nav';
import { Router, Match, Miss, Link, Redirect } from 'react-router';

require('../css/main.scss');

injectTapEventPlugin();

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ppu : false
        };
    }
    componentWillMount() {
    }
    render() {
        let ppu = this.state.ppu;
        if (!this.state.ppu) {
            location.hash = 'login';
            return null;
        }
        return(

            <div>
                <Header/>
                <Nav
                    router="add"
                    title="已有品类列表"
                    btnTitle="新增品类"
                    type="home"
                />
                <MuiThemeProvider>
                    <Fetch url="/mock/list.json">
                        <List />
                    </Fetch>
                </MuiThemeProvider>
            </div>
        )

    }

}

export default Main;