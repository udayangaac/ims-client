import React from "react";
import Dashboard from "../dashboard/Dashboard";


export const NavBarDetails = () => {
    const token = localStorage.getItem("auth-token");
    const name = localStorage.getItem("profile-name");
    if (token === null) {
        return (
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/signin">LOGIN</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signup">REGISTER</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">ABOUT</a>
                    </li>
                </ul>
            </div>
        );
    }
    return (
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/dashboard">DASHBOARD</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">ABOUT</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-user"/>{name}</a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                        <a className="dropdown-item" href="/logout">LOGOUT</a>
                    </div>
                </li>
            </ul>
        </div>
    );
};