import React from 'react'
import '../styles/Page-Auth.css'
import '../styles/App.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import axios from 'axios'



export default function ForgotPassword() {

    const [email, setEmail] = React.useState('')

    const [authError, setAuthError] = React.useState('')
    const [inputError, setInputError] = React.useState([])

    const [pageRegisterState, setPageRegisterState] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [timeLeft, setTimeLeft] = React.useState(5)
    const navigate = useNavigate()

    const resetButtonHandler = () => {
        axios({
            method: 'post', 
            url: 'https://tickitz-be.onrender.com/rizqi/auth/forgot-password',
            data: {
                email
            }
        }).then(() => {
            setPageRegisterState(true)
        }).catch(err =>{

            if (err.response.status === 422) {
                setInputError(err.response.data.messages)
            } 
            
            if (err.response.status === 400) {
                setAuthError(err.response.data.messages)
            }
            
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    React.useEffect(()=>{

        if (localStorage.getItem('user') || localStorage.getItem('token') ) {
            navigate('/')
        }   

        if (pageRegisterState) {
            setTimeout(()=>{
                for (let time = timeLeft; time > 0 ; time--) {
                    setTimeLeft(timeLeft-1)
                }
                if (timeLeft === 0) {
                    return navigate('/login')
                }
            },1000)
        }

    },[isLoading,authError,pageRegisterState,navigate,timeLeft])

    return (
        <>
            <div className='nav-auth'>
                <Navbar />
            </div>
            <div id='Page-ForgotPassword' className='Page-Auth'>
                <div id='Body-ForgotPassword' className='row m-auto'>
                    <div id='left-item' className='col-md-7'>
                        <img src='assets/img/logo.svg' alt="logo"/>
                        <div className='mb-4'>
                            <h1>Let's reset your password</h1>
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
                            <h1 style={{fontSize: '26px'}}>Fill your complete email</h1>
                            <p>we'll send a link to your email shortly</p>

                            <div className="alert alert-danger" role="alert" hidden={authError === '' ? true : false}>
                                {authError}
                            </div>
                            
                            <div className="alert alert-success" role="alert"  hidden={pageRegisterState ? false : true}>
                                OTP Sent, Check your email. redirect to login in {timeLeft}
                            </div>

                            <div className="form-group my-2">
                                <label htmlFor="email" className='form-lable d-flex flex-row justify-content-between'>
                                    <span className="form-lable">Email </span>
                                    <span className='form-validation' 
                                        style={{color: '#a50000'}}
                                        hidden={!inputError.hasOwnProperty('email') ? true : false}>
                                         Email is required
                                    </span>
                                </label>
                                <input id='email' type="email" className='form-control form-control-lg' placeholder='Write your email' 
                                    onChange={e=> {
                                        setEmail(e.target.value)
                                        if (inputError.hasOwnProperty('email')) {
                                            delete inputError.email
                                        }
                                    }}/>
                            </div>

                            <button id='button-auth' className='btn signup-button my-4'
                                onClick={()=>{
                                    setAuthError('')
                                    setIsLoading(true)
                                    resetButtonHandler()
                                }}> 
                                {isLoading ? 'Loading...' : 'Send'} 
                            </button>
                            <p className='text-center'><Link to='/'>Back to home</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
