import './SignIn.css'
import icon from '../assets/SignIn/user-circle.svg'
import { Link } from "react-router-dom";
import PasswordInput from './PasswordInput.jsx'
import React, { useState } from 'react';

const SignIn = () =>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    };

    return (

        <div className='stack'>
            <div className='container'>
                <img className='image-centered ' src={icon} alt='user icon'/>

                <div className='input-container'>
                    <p>Username</p>
                    <input className='custom-input' type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='input-container'>
                    <p>Password</p>
                    <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div className='button-container'>
                    <Link className='button-left' to="/register">
                        New user
                    </Link>
                    <button className='button-right' onClick={handleSignIn}>Sign In</button>
                </div>
            </div>
        </div>

    )

}

export default SignIn;