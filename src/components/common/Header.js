import React, {Component} from 'react';
import ProjectLogo from '../../images/projectLogo.png'
import {NavBarDetails} from "../helpers/NavBarDetail";
import "./Header.css"


let customStyle = {
    backgroundColor:"black",
    color:"white"
};

class Header extends Component {
    render() {
        return (
            <nav id="mainNav" className="navbar navbar-expand-lg navbar-default static-top">
                <div className="container">
                    <p className="navbar-brand" href="#">
                        {/*<img src={ProjectLogo} height={40} alt="logo"/>*/}
                        RANGA BAKERS
                    </p>
                    <button style={customStyle} className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        Menu
                    </button>
                    <NavBarDetails/>
                </div>
            </nav>
        );
    }
}

export default Header;

