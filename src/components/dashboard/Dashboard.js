import React, {Component} from 'react';
import '../app/App.css';
import Header from "../common/Header";


class Dashboard extends Component {
    render() {
        return (
            <section>
                <Header/>
                <h1>Dashboard</h1>
            </section>
        );
    }
}

export default Dashboard;