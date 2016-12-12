'use strict';
import React from 'react'
import { Router, Route, Link, hashHistory, browserHistory, IndexRoute } from 'react-router';
import Main from '../component/Main';
import Edit from '../component/Edit';
import Add from '../component/add/Add';
import Login from '../component/login/Login';
import Header from '../component/Header';

const SeoRouter = () => (
    <Router history={hashHistory}>
        <Route path='/' component={Main} />
        <Route path="/add" component={Add} />
        <Route path="/login" component={Login} />
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