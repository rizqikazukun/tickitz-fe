import React from 'react'
import '../styles/Page-Auth.css'
import '../styles/App.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import axios from 'axios'



export default function Register() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [fullname, setFullname] = React.useState('')
    const [phone, setPhone] = React.useState('')

    const [authError, setAuthError] = React.useState('')
    const [inputError, setInputError] = React.useState([])

    const [pageRegisterState, setPageRegisterState] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [timeLeft, setTimeLeft] = React.useState(5)
    const navigate = useNavigate()

    const registerButtonHandler = () => {
        axios({
            method: 'post', 
            url: 'https://tikitz-v2.adaptable.app/rizqi/auth/register',
            data: {
                email,
                password,
                'phone_number': phone,
                fullname,
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
            <div id='Page-Register' className='Page-Auth'>
                <div className='row m-auto'>
                    <div id='left-item' className='col-md-7'>
                        <img src='assets/img/logo.svg' alt="logo"/>
                        <p><span className='tagline'>wait, watch, wow!</span></p>
                    </div>
                    <div className='m-auto col-md-5'>
                        <div id="right-item">
                            <h1>Register</h1>
                            <p>Fill your additional details</p>

                            <div className="alert alert-danger" role="alert" hidden={authError === '' ? true : false}>
                                {authError}
                            </div>
                            
                            <div className="alert alert-success" role="alert"  hidden={pageRegisterState ? false : true}>
                                Register success, Check your email. redirect to login in {timeLeft}
                            </div>

                            <div className="form-group my-2">
                                <label htmlFor="fullname" className='form-lable d-flex flex-row justify-content-between'>
                                    <span className="form-lable">Full Name</span>
                                    <span className='form-validation' 
                                        style={{color: '#a50000'}}
                                        hidden={!inputError.hasOwnProperty('fullname') ? true : false}>
                                         Full Name is required
                                    </span>
                                </label>
                                <input id='fullname' type="text" className='form-control form-control-lg' placeholder='Write your Full Name' 
                                    onChange={e=> {
                                        setFullname(e.target.value)
                                        if (inputError.hasOwnProperty('fullname')) {
                                            delete inputError.fullname
                                        }
                                    }}/>
                            </div>

                            <div className="form-group my-2">
                                <label htmlFor="phone-number" className='form-lable d-flex flex-row justify-content-between'>
                                    <span className="form-lable">Phone Number</span>
                                    <span className='form-validation' 
                                        style={{color: '#a50000'}}
                                        hidden={!inputError.hasOwnProperty('phone_number') ? true : false}>
                                         Phone Number is required
                                    </span>
                                </label>
                                <input id='phone-number' type="text" className='form-control form-control-lg' placeholder='Write your phone number' 
                                    onChange={e=> {
                                        setPhone(e.target.value)
                                        if (inputError.hasOwnProperty('phone_number')) {
                                            delete inputError.phone_number
                                        }
                                    }}/>
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

                            <div className="form-group my-2">
                                <label htmlFor="password" className='form-lable d-flex flex-row justify-content-between'>
                                    <span className="form-lable">Password</span>
                                    <span className='form-validation' 
                                        style={{color: '#a50000'}}
                                        hidden={!inputError.hasOwnProperty('password') ? true : false}>
                                         Password is required
                                    </span>
                                </label>
                                <input id='password' type="password" className='form-control form-control-lg' placeholder='Write your password' 
                                    onChange={e=> {
                                        setPassword(e.target.value)
                                        if (inputError.hasOwnProperty('password')) {
                                            delete inputError.password
                                        }
                                    }}/>
                            </div>
						
                            <button id='button-auth' className='btn signup-button my-4'
                                onClick={()=>{
                                    setAuthError('')
                                    setIsLoading(true)
                                    registerButtonHandler()
                                }}> 
                                {isLoading ? 'Loading...' : 'Register'} 
                            </button>

                            <p className='text-center'>Already have account ? <Link to='/login'>login</Link></p>
                            <p className='text-center'><Link to='/'>Back to home</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
