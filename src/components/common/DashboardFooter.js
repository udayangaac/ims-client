import React, {Component} from 'react';
import '../app/App.css';
import LogoBW from '../../images/logoBW.png'

class DashboardFooter extends Component {
    render() {
        return (
            <footer className="page-footer font-small bg-light pt-4">
                <div className="footer-copyright text-center py-3">© 2018 Copyright <a
                    href="http://www.sixensor.com">www.sixensor.com</a></div>
            </footer>
        );
    }
}

export default DashboardFooter;

