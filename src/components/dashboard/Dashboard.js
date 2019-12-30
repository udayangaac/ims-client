import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";
import Transaction from "./Transaction";
import Stakeholder from "./Stakeholder";
import DashboardFooter from "../common/DashboardFooter";
import Item from "./Item";
import './Dashboard.css'
import {getProfile} from "../helpers/LocalStorage";
import IntroBg from "../../images/home_bg.jpeg";

let styleSubHeader = {
    backgroundImage: "url(" + IntroBg + ")",
};


class Dashboard extends Component {
    render() {
        let businessProfileName = "";
        let profile = getProfile();
        if (profile !== null && profile !== undefined) {
            businessProfileName = profile.business_profile_name;
        }
        return (
            <section>
                <Header/>
                <div id="dashboardContainer" className="container">
                    <div style={styleSubHeader} id="dashboardHeader" className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6 col-md-6">
                                <h4><b>DASHBOARD</b></h4>
                            </div>
                            <div className="col-sm-6 col-md-6">
                                {/*<h5><b>{businessProfileName}</b></h5>*/}
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="container">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active dashboard-tab" data-toggle="tab"
                                   href="#home">Transactions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link dashboard-tab" data-toggle="tab" href="#menu1">Stakeholders
                                    and
                                    Items</a>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a className="nav-link" data-toggle="tab" href="#menu2">Items</a>*/}
                            {/*</li>*/}
                        </ul>

                        <div id="dashboardTabContent" className="tab-content">
                            <div id="home" className="container tab-pane active"><br/>
                                <Transaction/>
                            </div>
                            <div id="menu1" className="container tab-pane fade"><br/>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Stakeholder/>
                                            <br/>
                                        </div>
                                        <div className="col-md-6">
                                            <Item/>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div id="menu2" className="container tab-pane fade"><br/>*/}
                            {/*</div>*/}
                        </div>
                        <br/>

                    </div>
                </div>
                <DashboardFooter/>
            </section>
        );
    }
}

export default Dashboard;
