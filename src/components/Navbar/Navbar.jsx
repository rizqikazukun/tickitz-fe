import React from 'react'
import './Navbar.css'
import './Navbar.mobile.css'

export default function Navbar() {
	return (
		<div id='navbar'>
			{/* <!-- nav link --> */}
			<nav className="d-flex justify-content-between my-5">
				<div id="nav-left-item" className="gap-4">
					<a href="/#"><img src="/assets/img/logo.svg" alt="logo" height="64px" /></a>
					<a className="desktop-component" href="/#">Home</a>
					<a className="desktop-component" href="/#">List Movie</a>
				</div>
				<div id="nav-right-item">
					<button id="signin-button" type="button" className="desktop-component btn" style={{ width: '120px' }}>
                        Login
					</button>
					<button id="signup-button" type="button" className="desktop-component btn" style={{ width: '120px' }}>
                        Register
					</button>
					{/* <!-- Burger Icon --> */}
					<button className="mobile-component btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">
						<img className="svg-color-tickitz-branding" src="/assets/img/icons/Hamburger_icon.svg" alt="menu" height="54px" />
					</button>
				</div>
			</nav>
			{/* <!-- end nav link --> */}
		</div>
	)
}
