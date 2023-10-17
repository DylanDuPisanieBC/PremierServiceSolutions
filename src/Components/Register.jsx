import './Register.css'
import icon from '../assets/SignIn/user-circle.svg'
import { Link } from "react-router-dom";
import PasswordInput from './PasswordInput.jsx'


const SignIn = () =>{

    
    return (

        <div class='stack'>
            <div class='container'>
                <img class='image-centered ' src={icon} alt='user icon'/>

                <div class='input-container'>
                    <p>Create Username</p>
                    <input class='custom-input' type='text'/>
                </div>
                <div class='input-container-m'>
                    <p>Create Password</p>
                    <PasswordInput/>
                </div>
                <div class='input-container'>
                    <p>Confirm Password</p>
                    <PasswordInput/>
                </div>

                <div class='button-container'>
                    <button class='button'>Register</button>
                </div>

                <a class='info'>Already haven an account?</a>

                <Link to="/sign_in" style={{ marginTop: 5, textDecoration: 'none', color: 'inherit' }}>
                    <a class='link'>Sign In</a>
                </Link>

            </div>
        </div>

    )

}

export default SignIn;