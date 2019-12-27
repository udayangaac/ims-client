import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";
import Transaction from "./Transaction";
import Stakeholder from "./Stakeholder";
import DashboardFooter from "../common/DashboardFooter";
import Item from "./Item";
import './Dashboard.css'
import {getProfile} from "../helpers/LocalStorage";


class Dashboard extends Component {



    render() {
        let businessProfileName = "";
        let profile = getProfile();
        if (profile !== null && profile !== undefined ) {
            businessProfileName = profile.business_profile_name;
        }
        return (
            <section>
                <Header/>
                <div className="container">
                    <br/>
                    <div className="row">
                        <div className="col-sm-6 col-md-6">
                            <h4>DASHBOARD</h4>
                        </div>
                        <div className="col-sm-6 col-md-6">
                            <h5>{businessProfileName}</h5>
                        </div>
                    </div>

                    <br/>
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#home">Transactions</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#menu1">Stakeholders</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#menu2">Items</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div id="home" className="container tab-pane active"><br/>
                            <Transaction/>
                        </div>
                        <div id="menu1" className="container tab-pane fade"><br/>
                            <Stakeholder/>
                        </div>
                        <div id="menu2" className="container tab-pane fade"><br/>
                            <Item/>
                        </div>
                    </div>
                </div>
                <DashboardFooter/>
            </section>
        );
    }
}

export default Dashboard;