import './CSS/Register.css'
import icon from '../assets/SignIn/user-circle.svg'
import { Link } from "react-router-dom";
import PasswordInput from './PasswordInput.jsx'
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignIn = () =>{

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [ErrorEmail, setErrorMessageEmail] = useState('');
    const [Error, setErrorMessage] = useState('');
    const [showEmailField, setShowEmailField] = useState(true);
    const history = useHistory();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);


    const handleNext = async () => {

        formData.set('email', email);
        if (email) {
            const isValidEmail = await checkEmail();
            if (isValidEmail) {
                setShowEmailField(false);
            }
        } 
        else {
            setErrorMessageEmail('Please enter a valid email.');
      }
    };
    
    const checkEmail = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/register/check_email', formData);
    
        if (response.data === 1) {
          setErrorMessageEmail('Email does not exist.');
          return false;
        } else if (response.data === 2) {
          setErrorMessageEmail('Email already in use.');
          return false;
        } else if (response.data === 3) {
          return true;
        }
    
        setErrorMessageEmail('Error connecting to server.');
        return false;
      } catch (error) {
        console.error('Error:', error);
        setErrorMessageEmail('Error connecting to server.');
        return false;
      }
    };

    const checkUsername = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/register/check_username', formData);

            if (response.data === 2) {
              setErrorMessage('Username already in use.');
              return false;
            } else if (response.data === 1) {
              return true;
            }
        
            setError('Error connecting to server.');
            return false;
          } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error connecting to server.');
            return false;
          }
    }

    const checkPassword = async () => {

        if(password == ""){ setErrorMessage('Please enter a password.'); return false; }
        if(passwordConfirm == ""){ setErrorMessage('Please confirm your password.'); return false; }
        if(password == passwordConfirm){
            return true;
        }else{
            setErrorMessage('Passwords do not match.');
            return false;
        }

    }
    
    const handleRegistration = async () => {
        
        formData.set('username', username);
        formData.set('password', password);
        if (username) {
            const isValidUsername = await checkUsername();
            if (isValidUsername) {
                const isPasswordMatching = await checkPassword();
                if(isPasswordMatching){
                    
                    const registerUser = await axios.post('http://localhost:8080/api/v1/register', formData);
                    if(registerUser != 0){
                        history.push('/sign_in');
                    }else{
                        setErrorMessage("Error connecting to server");
                    }

                }else{
                    return;
                }
            }else{
                return;
            }
        } 
        else {
            setErrorMessage('Please enter a valid username.');
      }
    };
    

    return (
        <div className='stack'>
            <div className='container'>
                <img className='image-centered' src={icon} alt='user icon' />
                {showEmailField ? (
                    <div>
                        <div className='input-container'>
                            <p>Enter employee email</p>
                            <input className='custom-input' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {ErrorEmail && (
                        <div className='error-message'>{ErrorEmail}</div>
                        )}
                        <div className='button-container'>
                            <button className='button' onClick={handleNext}>Next</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='input-container'>
                            <p>Create a username</p>
                            <input className='custom-input' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className='input-container-m'>
                            <p>Create Password</p>
                            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='input-container'>
                            <p>Confirm Password</p>
                            <PasswordInput value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        </div>
                        {Error && (
                        <div className='error-message'>{Error}</div>
                        )}
                        <div className='button-container'>
                            <button className='button' onClick={handleRegistration}>Register</button>
                        </div>
                    </div>
                )}
                <a className='info'>Already have an account?</a>
                <Link className='link' to="/sign_in" style={{ marginTop: 5, textDecoration: 'none', color: 'inherit' }}>Sign In</Link>
            </div>
        </div>
    );

}

export default SignIn;