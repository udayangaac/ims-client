import React, {Component} from 'react';
import '../app/App.css';


class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small bg-light pt-4">
                <div className="container-fluid text-center text-md-left">
                    <div className="row">
                        <hr className="clearfix w-100 d-md-none pb-3"/>
                        <div className="col-md-3 mb-md-0 mb-3">

                        </div>
                        <div className="col-md-3 mb-md-0 mb-3">

                        </div>
                    </div>
                </div>
                <div className="footer-copyright text-center py-3">© 2018 Copyright: <a href="http://www.sixensor.com">www.sixensor.com</a></div>
            </footer>
        );
    }
}

export default Footer;

