import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../home/Home'
import Login from "../login/Login";
import Dashboard from "../dashboard/Dashboard";
import Auth from "../auth/Auth";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/signin" exact component={Login}/>
                    <Route path="/" exact component={Home}/>
                    <Auth>
                        <Route path="/dashboard" exact component={Dashboard}/>
                    </Auth>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;