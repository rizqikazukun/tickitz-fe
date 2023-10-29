import React from 'react'
import './Navbar.css'
import './Navbar.mobile.css'
import { Link } from 'react-router-dom'


export default function Navbar() {

    const [profile, setProfile] = React.useState({})


    const initNavbar = (state) => {
        if (localStorage.getItem('user') && localStorage.getItem('token')) {
            setProfile(state)
        }
    }

    const navProfile = () => {
        if (profile.hasOwnProperty('id')) {
            return (
                <>
                    {/* Desktop Component */}
                    <div className="btn-group">
                        <button type="button" className="desktop-component btn dropdown-toggle" data-bs-toggle="dropdown" style={{ border: 'unset' }}>
                            <img src={profile.photo} alt="profile" style={{ height: '50px', width: '50px', backgroundColor: '#e1e1e1', borderRadius: '50%' }} />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end shadow p-3 mb-5 rounded" style={{ border: 'unset' }}>
                            <li><button className="dropdown-item" type="button" onClick={
                                () => {
                                    localStorage.removeItem('user')
                                    localStorage.removeItem('token')
                                    window.location.reload()
                                }

                            }>Logout</button></li>
                        </ul>
                    </div>

                    {/* Mobile Component */}
                    <button className="mobile-component btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">
                        <img src={profile.photo} alt="profile" style={{ height: '50px', width: '50px', backgroundColor: '#e1e1e1', borderRadius: '50%' }} />
                    </button>
                </>
            )
        }
        return (
            <>
                {/* Desktop Component */}
                <Link to="/login">
                    <button id="signin-button" type="button" className="desktop-component btn mx-1" style={{ width: '120px' }}>
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button id="signup-button" type="button" className="desktop-component btn mx-1" style={{ width: '120px' }}>
                        Register
                    </button>
                </Link>

                {/* Mobile Component */}
                {/* <!-- Burger Icon --> */}
                <button className="mobile-component btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">
                    <img className="svg-color-tickitz-branding" src="/assets/img/icons/Hamburger_icon.svg" alt="menu" height="54px" />
                </button>
            </>
        )
    }

    const offcanvas = () => {

        if (profile.hasOwnProperty('id')) {

            return (
                <>
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

                            <button className='canvasItem btn' style={{ cursor: 'pointer', border: 'unset', backgroundColor: 'unset', width: '100%' }}
                                onClick={() => {
                                    localStorage.removeItem('user')
                                    localStorage.removeItem('token')
                                    window.location.reload()
                                }}>
                                Logout
                            </button>

                            <div className='canvasItem' data-bs-dismiss="offcanvas">
                                Close
                            </div>
                        </div>
                    </div>
                    {/* <!-- end of Bootstrap Canvas --> */}
                </>
            )

        }
        return (
            <>
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
                        <div className='canvasItem' data-bs-dismiss="offcanvas">
                            Close
                        </div>
                    </div>
                </div>
                {/* <!-- end of Bootstrap Canvas --> */}
            </>
        )
    }

    React.useEffect(() => {

        if (!profile.hasOwnProperty('id')) {
            initNavbar(JSON.parse(localStorage.getItem('user')))
        }

    }, [profile])

    return (
        <div id='navbar' style={{backgroundColor: 'white' }}>
            {/* <!-- nav link --> */}
            <nav className="container d-flex justify-content-between">
                <div id="nav-left-item" className="gap-4">
                    <div style={{ height: '36px' }}>
                        <Link to='/'><img src="/assets/img/logo.svg" alt="logo" style={{ height: '100%' }} /></Link>
                    </div>
                    <div className="desktop-component">
                        <Link to='/'>Home</Link>
                    </div>
                    <div className="desktop-component">
                        <Link to='/list-movie'>Movie List</Link>
                    </div>
                </div>

                <div id="nav-right-item">
                    {navProfile()}
                </div>
            </nav>

            {offcanvas()}

            {/* <!-- end of Bootstrap Canvas --> */}
        </div>
    )
}
