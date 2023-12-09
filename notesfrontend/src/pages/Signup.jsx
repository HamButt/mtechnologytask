import React, { useState } from 'react';
import axios from 'axios';
import '../styles/global.css'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../config/Config';
import { useNavigate } from 'react-router-dom';
import { RESGISTRATION, SIGNIN } from '../config/Endpoints';

const Signup = () => {
  
    document.title = "Sign up"
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [signInModal, setSignInModal] = useState(false);


    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axios.post(`${BASE_URL}${RESGISTRATION}`, { email, password })
        .then((res) => {
            if(res.status === 200){
                setSignInModal(true)
                setIsLoading(false)
            }
            setEmail('')
            setPassword('')
        }).catch((err) => {
            setError(err.response.data.error)
            setEmail('')
            setPassword('')
            setIsLoading(false)
    })} 

    const handleSignIn = (e) => {
            e.preventDefault();
            setIsLoading(true)
            axios.post(`${BASE_URL}${SIGNIN}`, { email,password })
            .then((res) => {
                if(res.status === 200){
                    navigate('/notes')
                    setIsLoading(false)
                }
                setEmail('')
            }).catch((err) => {
                setError(err.response.data.error)
                setIsLoading(false)
    })} 

  return (

    <div >
        <nav className="navbar navbar-expand-lg px-4">
            <Link className="navbar-brand mt-2" to="/">NotesApp</Link>
        </nav>
        <h2 className='text-center mt-5' style={{fontFamily: "Poppins"}} >Sign In to create Note of your choice</h2>
        <div className="form-section py-4 mt-5">
                { signInModal ? 

                    <form className='form d-flex flex-column' onSubmit={handleSignIn}>
                        <label> Email:</label>
                        <input type="email" className='sign-in-input' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label> Password: </label>
                        <input className='sign-in-input' type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <span style={{color:"red",fontFamily:"Poppins",fontSize:'14px',fontWeight:'500',marginTop:'8px'}} >{error ? error : ""}</span>
                        <button className='sign-up-btn' type="submit">{isLoading ? "Signing you in..." : "Sign In"}</button>
                    </form>
                    :
                    <form className='form d-flex flex-column' onSubmit={handleRegister}>
                        <label> Email:</label>
                        <input type="email" className='sign-in-input' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label> Password: </label>
                        <input className='sign-in-input' type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <span style={{color:"red",fontFamily:"Poppins",fontSize:'14px',fontWeight:'500',marginTop:'8px'}} >{error ? error : ""}</span>
                        <button id='sign-in-btn' onClick={() => {setSignInModal(true); setError(false)}}>Sign In</button>
                        <button className='sign-up-btn' type="submit">{isLoading ? "Registering..." : "Sign up"}</button>
                    </form>
                }
        </div>
    </div>
  );
};

export default Signup;
