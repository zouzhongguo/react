'use strict';
import React from 'react'
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';
import { createHistory, createHashHistory, useBasename } from 'history';

import Main from '../components/Main';
import Edit from '../components/Edit';
import Add from '../components/Add';
import Header from '../components/Header';

const SeoRouter = () => (
    <Router history={hashHistory}>
        <Route path='/' component={Main} />
        <Route path="/add" component={Add} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="*" component={NoMatch}/>
    </Router>
);

const NoMatch = () => (
    <div>
        <Header />
        <div className="match-error">
            <p>URL路径非法，请检查</p>
            <Link to="/">回首页</Link>
        </div>
    </div>
);

export default SeoRouter;