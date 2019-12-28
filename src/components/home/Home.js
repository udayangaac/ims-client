import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";
import Footer from "../common/Footer";
import './Home.css'
import IntroImg from '../../images/intro-img.svg'
import IntroBg from "../../images/intro-bg.jpg";

let introStyle = {
    backgroundImage: "url(" + IntroBg + ")",
};

class Home extends Component {
    render() {
        return (
            <section>
                <Header/>
                <section id="intro" style={introStyle} class="clearfix">
                    <div className="container d-flex h-100">
                        <div className="row justify-content-center align-self-center">
                            <div className="col-md-6 intro-info order-md-first order-last">
                                <h2>Management Solutions<br/>for Your <span>Business!</span></h2>
                                <div>
                                    <a href="/login" className="btn-get-started scrollto">Get Started</a>
                                </div>
                            </div>
                            <div className="col-md-6 intro-img order-md-last order-first">
                                <img src={IntroImg} alt="" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </section>
        );
    }
}

export default Home;