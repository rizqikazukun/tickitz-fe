import React from 'react'
import './Footer.css'
import './Footer.mobile.css'

export default function Footer() {
    return (
        <div className='footer' style={{backgroundColor: 'white'}}>
            <footer className="container my-5">
                <div className="row m-auto">
                    <div className="col-md-4 col-xs-12 p-4">
                        <img src="/assets/img/logo.svg" alt="logo" style={{ width: '60%',maxWidth: '256px', marginBottom: '10px' }} />
                        <p>
                            <span className="footer-item-content">
                                Stop waiting in line. Buy tickets conveniently, watch movies quietly.
                            </span>
                        </p>
                    </div>
                    <div className="col-md-2 col-xs-12 p-3">
                        <p><span className="footer-item-title">Explore</span></p>
                        <p><a href="/#"><span className="footer-item-content">Home</span></a></p>
                        <p><a href="/#"><span className="footer-item-content">Movie List</span></a></p>
                    </div>
                    <div className="col-md-3 col-xs-12 p-3">
                        <p><span className="footer-item-title">Our Sponsors</span></p>
                        <p>
                            <img className="m-2" src="/assets/img/cinemas/ebv.id 2.svg" alt="logo" />
                        </p>
                        <p>
                            <img className="m-2" src="/assets/img/cinemas/CineOne21 2.svg" alt="logo" />
                        </p>
                        <p>
                            <img className="m-2" src="/assets/img/cinemas/hiflix 2.svg" alt="logo" />
                        </p>
                    </div>
                    <div className="col-md-3 col-xs-12 p-3">
                        <p><span className="footer-item-title">Follow Us</span></p>
                        <p>
                            <img className="m-2" src="/assets/img/icons/facebook.svg" alt="logo" />
                            <span className="footer-item-content">Tickitz Cinema id</span>
                        </p>
                        <p>
                            <img className="m-2" src="/assets/img/icons/bx_bxl-instagram.svg" alt="logo" />
                            <span className="footer-item-content">tickitz.id</span>
                        </p>
                        <p>
                            <img className="m-2" src="/assets/img/icons/twitter.svg" alt="logo" />
                            <span className="footer-item-content">tickitz.id</span>
                        </p>
                        <p>
                            <img className="m-2" src="/assets/img/icons/youtube.svg" alt="logo" />
                            <span className="footer-item-content">Tickitz Cinema id</span>
                        </p>

                    </div>
                </div>
                <p className="text-center" style={{ color: 'var(--tic-color-muted)' }} >&#169; 2023 Tickitz. All Rights Reserved.</p>
            </footer>
        </div>
    )
}
