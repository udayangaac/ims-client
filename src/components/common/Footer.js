import React, {Component} from 'react';
import '../app/App.css';
import LogoFull from '../../images/logoFull.png'

class Footer extends Component {
    render() {
        return (
            <footer className="page-footer font-small bg-light pt-4">
                <div className="container text-center text-md-left">
                    <div className="row">
                        <hr className="clearfix w-100 d-md-none pb-3"/>
                        <div className="col-md-4 mb-md-0 mb-4 text-justify">
                            <img src={LogoFull} height={30}/>
                            <br/>
                            <br/>
                            <div className="footer-newsletter">
                                <h5>Our Newsletter</h5>
                                <p>Subscribe to our news letters services to notify about our latest updates and
                                    open-source libraries.</p>
                                <form>
                                    <div className="form-group">
                                        <input className="form-control" type="email" name="email"/>
                                    </div>
                                    <button className="btn btn-dark" type="submit" >Subscribe</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md46 mb-md-0 mb-4">

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

