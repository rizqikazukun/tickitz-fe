import React from 'react'
import '../styles/Register.css'
import '../styles/App.css'
import { Link } from 'react-router-dom'
import '../styles/App.css'

export default function Register() {
    return (
        <div id='Page-Register'>
            <div className='row m-auto'>
                <div id='left-item' className='col-md-7'>
                    <img src='assets/img/logo.svg' alt="logo"/>
                    <p>wait, watch, wow!</p>
                </div>
                <div className='m-auto col-md-5'>
                    <div id="right-item">
                        <h1>Register</h1>
                        <p>Fill your additional details</p>

                        <div className="form-group my-2">
                            <label htmlFor="fullname"><span className="form-lable">Full Name</span></label>
                            <input id='fullname' type="text" className='form-control form-control-lg' placeholder='Write your full name' />
                        </div>

                        <div className="form-group my-2">
                            <label htmlFor="phone-number"><span className="form-lable">Phone Number</span></label>
                            <input id='phone-number' type="text" className='form-control form-control-lg' placeholder='Write your phone number' />
                        </div>

                        <div className="form-group my-2">
                            <label htmlFor="email"><span className="form-lable">Email</span></label>
                            <input id='email' type="email" className='form-control form-control-lg' placeholder='Write your email' />
                        </div>

                        <div className="form-group my-2">
                            <label htmlFor="password"><span className="form-lable">Password</span></label>
                            <input id='password' type="password" className='form-control form-control-lg' placeholder='Write your password' />
                        </div>
						
                        <button id='button-register' className='btn signup-button my-4'> Register </button>
                        <p className='text-center'>Already have account ? <Link to='/login'>login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}