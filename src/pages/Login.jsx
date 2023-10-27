import React from 'react'
import '../styles/Page-Auth.css'
import '../styles/App.css'
import { Link } from 'react-router-dom'
export default function Login() {
    return (
        <div id='Page-Login' className='Page-Auth'>
            <div className='row m-auto'>
                <div id='left-item' className='col-md-7'>
                    <img src='assets/img/logo.svg' alt="logo"/>
                    <p>wait, watch, wow!</p>
                </div>
                <div className='m-auto col-md-5'>
                    <div id="right-item">
                        <h1>Login</h1>
                        <p>Sign in with your data that you entered during your registration</p>

                        <div className="form-group my-2">
                            <label htmlFor="email"><span className="form-lable">Email</span></label>
                            <input id='email' type="email" className='form-control form-control-lg' placeholder='Write your email' />
                        </div>

                        <div className="form-group my-2">
                            <label htmlFor="password"><span className="form-lable">Password</span></label>
                            <input id='password' type="password" className='form-control form-control-lg' placeholder='Write your password' />
                        </div>
						
                        <button id='button-login' className='btn signup-button my-4'> Login </button>
                        <p className='text-center'>Forgot your password? <Link to='/forgot-password'>Reset now?</Link></p>
                        <p className='text-center'>Don’t have an account? <Link to='/register'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
