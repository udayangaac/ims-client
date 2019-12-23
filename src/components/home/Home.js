import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";
import Footer from "../common/Footer";


class Home extends Component {
    render() {
        return (
            <section>
                <Header/>
                <Footer/>
            </section>
        );
    }
}

export default Home;