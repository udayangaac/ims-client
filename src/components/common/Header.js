import React, {Component} from 'react';
import '../app/App.css';
import Logo from "../../images/logoFull.png"
import {NavBarDetails} from "../helpers/NavBarDetail";


class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={Logo} height={30} alt="logo"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <NavBarDetails/>
                </div>
            </nav>
        );
    }
}

export default Header;

