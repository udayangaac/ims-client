import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";
import Footer from "../common/Footer";
import AccountImage from "../../images/bg_account.png"
import StakeholderImage from "../../images/bg_stakeholders.png"
import StoreImage from "../../images/bg_store.jpg"


class Home extends Component {
    render() {
        return (
            <section>
                <Header/>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleSlidesOnly" data-slide-to="0" className="active"/>
                        <li data-target="#carouselExampleSlidesOnly" data-slide-to="1"/>
                        <li data-target="#carouselExampleSlidesOnly" data-slide-to="2"/>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={AccountImage} alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={StakeholderImage} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={StoreImage} alt="Third slide"/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </section>
        );
    }
}

export default Home;