import React, {Component} from 'react';
import '../app/App.css';
import LogoBW from '../../images/logoBW.png'

class DashboardFooter extends Component {
    render() {
        return (
            <footer id="dashboardFooter" className="page-footer font-small bg-dark pt-4">
                <div className="footer-copyright text-center py-3 ">© 2019 Copyright <a
                   className="footer-copyright-wt" href="http://www.sixensor.com">www.sixensor.com</a></div>
            </footer>
        );
    }
}

export default DashboardFooter;

