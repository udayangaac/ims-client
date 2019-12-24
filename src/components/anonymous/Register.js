import React, {Component} from 'react';
import axios from 'axios'
import './Login.css'
import Header from "../common/Header";
import Footer from "../common/Footer";
import ReCAPTCHA from "react-google-recaptcha";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            username: '',
            businessProfile: '',
            password: ''
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
        axios.post('http://localhost:8001/signup', {
            name: this.state.name,
            email: this.state.email,
            username: this.state.username,
            businessProfile: this.state.businessProfile,
            password: this.state.password
        }).then(resp => {
            console.log(resp.data)
            this.props.history.push('/signin')
        });
    }

    render() {
        return (
            <section>
                <Header/>
                <div className="login-form">
                    <form onSubmit={e => this.submit(e)} noValidate autoComplete="off">
                        <h2 className="text-center">Register </h2>
                        <div className="form-group">
                            <input className="form-control" placeholder="Name" type="text" name="username"
                                   onChange={e => this.change(e)} value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="E-mail" type="text" name="email"
                                   onChange={e => this.change(e)} value={this.state.email}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Username" type="text" name="username"
                                   onChange={e => this.change(e)} value={this.state.username}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Business Name" type="text" name="businessProfile"
                                   onChange={e => this.change(e)} value={this.state.businessProfile}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Password" type="password" name="password"
                                   onChange={e => this.change(e)} value={this.state.password}/>
                        </div>
                        <div className="form-group">
                            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </div>
                    </form>
                    <p className="text-center">Already have an account! <a href="/signin">login</a></p>
                </div>
                <Footer/>
            </section>
        );
    }
}

export default Register;