import React, {Component} from 'react';
import ProjectLogo from '../../images/projectLogo.png'
import {NavBarDetails} from "../helpers/NavBarDetail";
import "./Header.css"


class Header extends Component {
    render() {
        return (
            <nav id="mainNav" className="navbar navbar-expand-lg navbar-default static-top">
                <div className="container">
                    <p className="navbar-brand" href="#">
                        {/*<img src={ProjectLogo} height={40} alt="logo"/>*/}
                        Ranga Bakers, Bulathsinghala.
                    </p>
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

