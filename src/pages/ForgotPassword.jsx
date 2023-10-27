import React from 'react'
import '../styles/Page-Auth.css'
import '../styles/App.css'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    return (
        <div id='Page-ForgotPassword' className='Page-Auth'>
            <div id='Body-ForgotPassword' className='row m-auto'>
                <div id='left-item' className='col-md-7'>
                    <img src='assets/img/logo.svg' alt="logo"/>
                    <div className='mb-4'>
                        <h1>Lets reset your password</h1>
                        <p>To be able to use your account again, please complete the following steps.</p>
                    </div>
                    <div className='d-flex flex-column gap-4'>
                        <div className='dot-body'>
                            <div className='dot-number'>
                                <p><span className='dot-title'>1</span></p>
                            </div>
                            <div>
                                <p><span className='dot-content'>Fill your complete email</span></p>
                            </div>
                        </div>
                        <div className='dot-body'>
                            <div className='dot-number'>
                                <p><span className='dot-title'>2</span></p>
                            </div>
                            <div>
                                <p><span className='dot-content'>Check your email</span></p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='m-auto col-md-5'>
                    <div id="right-item">
                        <h1>Fill your complete email</h1>
                        <p>we'll send a link to your email shortly</p>
                        
                        <div className="form-group my-2">
                            <label htmlFor="email"><span className="form-lable">Email</span></label>
                            <input id='email' type="email" className='form-control form-control-lg' placeholder='Write your email' />
                        </div>

                        <button id='button-register' className='btn signup-button my-4'> Send </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
