import React, {Component} from 'react';
import '../app/App.css';
import LogoSQ from '../../images/logoSQ.png'
import './Footer.css'

let imageStyleSQ = {
    height: "75px",
    borderRadius: "50%"
};


class Footer extends Component {
    render() {
        return (
            // <footer className="page-footer font-small bg-light pt-4">
            //     <div className="container text-center text-md-left">
            //         <div className="row">
            //             <hr className="clearfix w-100 d-md-none pb-3"/>
            //             <div className="col-md-4 mb-md-0 mb-4 text-justify">
            //                 <img src={LogoFull} height={30}/>
            //                 <br/>
            //                 <br/>
            //                 <div className="footer-newsletter">
            //                     <h5>Our Newsletter</h5>
            //                     <p>Subscribe to our news letters services to notify about our latest updates and
            //                         open-source libraries.</p>
            //                     <form>
            //                         <div className="form-group">
            //                             <input className="form-control" type="email" name="email"/>
            //                         </div>
            //                         <button className="btn btn-dark" type="submit" >Subscribe</button>
            //                     </form>
            //                 </div>
            //             </div>
            //             <div className="col-md46 mb-md-0 mb-4">
            //
            //             </div>
            //         </div>
            //     </div>
            //     <div className="footer-copyright text-center py-3">© 2018 Copyright <a
            //        className="footer-copyright-bl" href="http://www.sixensor.com">www.sixensor.com</a></div>
            //
            // </footer>

            <footer className="footer-bs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 footer-brand animated fadeInLeft text-center">
                            <img src={LogoSQ} style={imageStyleSQ}/>
                            <br/>
                            <h4>Sixensor Inc.</h4>
                            <p>© 2020 , All rights reserved</p>
                        </div>
                        <div className="col-md-4 footer-nav animated fadeInUp">
                            <h4>Menu</h4>
                            <div className="col-md-6">
                                <ul className="list">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/about">About Us</a></li>
                                </ul>
                            </div>
                            <h4>Contact Us</h4>
                            <ul className="list">
                                <li><a href=""><i className="fa fa-phone-square"/> 076 227 8118</a></li>
                            </ul>
                        </div>
                        <div className="col-md- 4 footer-social animated fadeInDown">
                            <h4>Follow Us</h4>
                            <ul>
                                <li><a href="https://www.facebook.com/sixensor"><i
                                    className="fa fa-facebook-square"/> Facebook</a></li>
                                <li><a href="https://www.instagram.com/sixensor"> <i
                                    className="fa fa-instagram"/> Instagram</a></li>
                                <li><a href="https://www.youtube.com/channel/UChQwU2Gb0oeWb-wFaSqf-qg">
                                    <i className="fa fa-youtube-square"/> You Tube</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;

