import React from 'react'
import './Navbar.css'
import './Navbar.mobile.css'
import { Link } from 'react-router-dom'


export default function Navbar() {
	return (
		<div id='navbar'>
			{/* <!-- nav link --> */}
			<nav className="container d-flex justify-content-between">
				<div id="nav-left-item" className="gap-4">
					<div style={{height:'36px'}}>
						<Link to='/'><img src="/assets/img/logo.svg" alt="logo" style={{height: '100%'}}/></Link>
					</div>
					<div className="desktop-component">
						<Link to='/'>Home</Link>
					</div>
					<div className="desktop-component">
						<Link to='/list-movie'>Movie List</Link>
					</div>
				</div>
				<div id="nav-right-item">
					
					<Link to="/login">
						<button id="signin-button" type="button" className="desktop-component btn mx-1" style={{ width: '120px' }}>
                        Login
						</button>
					</Link>
					<Link to="/register"><button id="signup-button" type="button" className="desktop-component btn mx-1" style={{ width: '120px' }}>
                        Register
					</button>
					</Link>
					{/* <!-- Burger Icon --> */}
					<button className="mobile-component btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">
						<img className="svg-color-tickitz-branding" src="/assets/img/icons/Hamburger_icon.svg" alt="menu" height="54px" />
					</button>
				</div>
			</nav>
			{/* <!-- end nav link --> */}

			{/* <!-- Bootstrap Canvas --> */}
			<div className="offcanvas offcanvas-top shadow text-center" tabIndex="-1" id="offcanvasTop">
				<div className="offcanvas-body">
					<Link to='/'>
						<div className='canvasItem'>
							Home	
						</div>
					</Link>
					<Link to='/list-movie'>
						<div className='canvasItem'>
							List Movie	
						</div>
					</Link>
					<Link to='/login'>
						<div className='canvasItem'>
							Login	
						</div>
					</Link>
					<Link to='/register'>
						<div className='canvasItem'>
							Register	
						</div>
					</Link>

					
					<div  className='canvasItem' data-bs-dismiss="offcanvas">
						Close
					</div>
				</div>
			</div>
			{/* <!-- end of Bootstrap Canvas --> */}
		</div>
	)
}
