import React, {Component} from 'react';
import '../app/App.css';
import ProjectLogo from '../../images/projectLogo.png'

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small bg-light pt-4">
                <div className="container text-center text-md-left">
                    <div className="row">
                        <hr className="clearfix w-100 d-md-none pb-3"/>
                        <div className="col-md-6 mb-md-0 mb-6 text-justify">
                            <img src={ProjectLogo} height={50}/>
                            <br/>
                            <p className="font-small">Inventory management software is a software system for
                                tracking inventory levels, orders, sales and deliveries.
                                It can also be used in the manufacturing industry to create a
                                work order, bill of materials and other production-related documents.</p>
                        </div>
                        <div className="col-md-6 mb-md-0 mb-6">

                        </div>
                    </div>
                </div>
                <div className="footer-copyright text-center py-3">© 2018 Copyright <a
                    href="http://www.sixensor.com">www.sixensor.com</a></div>
            </footer>
        );
    }
}

export default Footer;

