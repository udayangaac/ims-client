import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";
import Footer from "../common/Footer";
import AccountImage from "../../images/bg_account.png"
import StakeholderImage from "../../images/bg_stakeholders.png"
import StoreImage from "../../images/bg_store.jpg"


class About extends Component {
    render() {
        return (
            <section>
                <Header/>
                <div className="container">
                    <br/>
                    <h2>About</h2>
                    <br/>
                </div>
                <Footer/>
            </section>
        );
    }
}

export default About;