import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from '../home/Home'
import Login from "../anonymous/Login";
import Dashboard from "../dashboard/Dashboard";
import Auth from "../authentication/Auth";
import Register from "../anonymous/Register";
import Logout from "../authentication/Logout";
import About from "../home/About";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/signin" exact component={Login}/>
                    {/*<Route path="/signup" exact component={Register}/>*/}
                    <Route path="/about" exact component={About}/>
                    <Route path="/" exact component={Home}/>
                    <Auth>
                        <Route path="/dashboard" exact component={Dashboard}/>
                        <Route path="/logout" exact component={Logout}/>
                    </Auth>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;