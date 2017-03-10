import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import App from './components/app'
import NewsDetail from './components/news_detail'
import NewsContainer from './components/news_container'
import UserCenter from './components/user_center'
import './index.css'
render((
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={NewsContainer}></IndexRoute>
            <Route path='/detail/:uniquekey' component={NewsDetail}></Route>
            <Route path='/usercenter' component={UserCenter}></Route>
        </Route>
    </Router>
),document.getElementById('root'))


