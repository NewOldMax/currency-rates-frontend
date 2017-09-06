import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import Logout from './components/Logout';
import App from './components/App';
import PublicApp from './components/PublicApp';
import LoginStore from './stores/LoginStore';
import Home from './components/home/Home';
import Pairs from './components/pairs/Pairs';
import PairPage from './components/pairs/PairPage';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';

function requireAuth(nextState, replace) {
    if (!LoginStore.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname },
        });
    }
}

render((
    <Router history={browserHistory}>
        <Route component={App} onEnter={requireAuth}>
            <Route path="/" component={Home} />
            <Route path="pairs" component={Pairs} />
            <Route path="pairs/:id" component={PairPage} />
            <Route path="logout" component={Logout} />
        </Route>
        <Route component={PublicApp}>
            <Route path="/login" component={Login} />
        </Route>
        <Route path="*" component={PageNotFound} />
    </Router>
), document.getElementById('content'));

render((<div />), document.getElementById('loader'));
