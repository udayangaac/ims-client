import React, {Component} from 'react';
import Home from "../home/Home";
import axios from 'axios'
import './Login.css'
import Header from "../common/Header";
import Footer from "../common/Footer";
import {getURL} from "../helpers/Config";
import IntroBg from "../../images/intro-bg.jpg";


let loginBackground = {
    backgroundImage: "url(" + IntroBg + ")",
    // marginTop:0,
    // marginBottom:0
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        axios.post(getURL("/signin"), {
            username: this.state.username,
            password: this.state.password
        }).then(resp => {
            console.log(resp.data.token);
            localStorage.setItem('auth-token', resp.data.token)
            this.props.history.push('/dashboard')
        });
    }

    render() {
        return (
            <section style={loginBackground}>
                <Header/>
                <div className="login-form">
                    <form onSubmit={e => this.submit(e)} noValidate autoComplete="off">
                        <h2 className="text-center">LOGIN</h2>
                        <div className="form-group">
                            <input className="form-control" placeholder="Username" type="text" name="username"
                                   onChange={e => this.change(e)} value={this.state.username}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Password" type="password" name="password"
                                   onChange={e => this.change(e)} value={this.state.password}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-dark btn-sm btn-block">LOGIN</button>
                        </div>
                        <div className="clearfix">
                            <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember
                                me</label>
                            <a href="#" className="pull-right">Forgot Password?</a>
                        </div>
                    </form>
                    <p className="text-center"><a href="/singup">Create an Account</a></p>
                </div>
                <Footer/>
            </section>
        );
    }
}

export default Login;