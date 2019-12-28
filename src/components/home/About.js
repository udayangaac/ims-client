import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";
import Footer from "../common/Footer";
import AboutBg from "../../images/about-us.jpg"
import './About.css'


let aboutUs = {
    backgroundImage: "url(" + AboutBg + ")",
    backgroundPosition: "center",
    height: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    opacity: 0.9
};

class About extends Component {
    render() {
        return (
            <section>
                <Header/>
                    <section id="about">
                        <div className="container-fluid" style={aboutUs}>
                            <br/>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-7 col-md-6">
                                        <div className="about-content">
                                            <h4><b>About Us</b></h4>
                                            <p>We are software engineering team in Sri Lanka developing high end
                                                applications with rich
                                                technology stack.</p>
                                            <p>We can help you see data and processes differently, break the boundaries
                                                for your
                                                products,
                                                or even change your business model adding value to your products, data
                                                gathered and
                                                information output.</p>
                                            <form action="signin">
                                                <button className="btn btn-info scrollto">Login</button>
                                            </form>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>
                    </section>
                <Footer/>
            </section>
        );
    }
}

export default About;