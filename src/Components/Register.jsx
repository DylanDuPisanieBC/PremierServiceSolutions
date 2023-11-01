import './CSS/Register.css'
import icon from '../assets/SignIn/user-circle.svg'
import { Link } from "react-router-dom";
import PasswordInput from './PasswordInput.jsx'


const SignIn = () =>{

    
    return (

        <div className='stack'>
            <div className='container'>
                <img className='image-centered ' src={icon} alt='user icon'/>

                <div className='input-container'>
                    <p>Create Username</p>
                    <input className='custom-input' type='text'/>
                </div>
                <div className='input-container-m'>
                    <p>Create Password</p>
                    <PasswordInput/>
                </div>
                <div className='input-container'>
                    <p>Confirm Password</p>
                    <PasswordInput/>
                </div>

                <div className='button-container'>
                    <button className='button'>Register</button>
                </div>

                <a className='info'>Already haven an account?</a>

                <Link className='link' to="/sign_in" style={{ marginTop: 5, textDecoration: 'none', color: 'inherit' }}>Sign In</Link>

            </div>
        </div>

    )

}

export default SignIn;