import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";
import Footer from "../common/Footer";
import Transaction from "./Transaction";


class Dashboard extends Component {
    render() {
        return (
            <section>
                <Header/>
                <div className="container">
                    <h3>IMS Dashboard</h3>
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
                            <h3>Menu 1</h3>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                ea commodo consequat.</p>
                        </div>
                        <div id="menu2" className="container tab-pane fade"><br/>
                            <h3>Menu 2</h3>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam.</p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </section>
        );
    }
}

export default Dashboard;