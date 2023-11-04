import './CSS/SignIn.css';
import icon from '../assets/SignIn/user-circle.svg';
import { Link } from "react-router-dom";
import PasswordInput from './PasswordInput.jsx';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignIn = () =>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputError, setErrorMessage] = useState('');
    const history = useHistory();


    const handleSignIn = async () => {
    
        //user input error handling -> display message to inform user to input both required fields
        if(username == "" && password == "") { setErrorMessage("Please enter a username and password"); return; }
        if(username == "") { setErrorMessage("Please enter a username"); return; }
        if(password == "") { setErrorMessage("Please enter a password"); return; }

        //create variable to hold data that has been entered by user
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            //create variable to hold the response data -> in this case the user id from the entered data
            //if the user is not found it will return 0
            const response = await axios.post('http://localhost:8080/api/v1/sign_in', formData);    
            
            if(response.data != 0){
                history.push('/dashboard');
            }else{
                setErrorMessage('Username and password do not exist.');
            }
        } 
        catch (error) {
            console.error('Error:', error);
            setErrorMessage('Cannot Contact Server.');
        }

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

                {inputError && (
                    <div className='error-message'>{inputError}</div>
                )}

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