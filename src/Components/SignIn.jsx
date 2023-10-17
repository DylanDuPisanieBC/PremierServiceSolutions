import './SignIn.css'
import icon from '../assets/SignIn/user-circle.svg'
import { Link } from "react-router-dom";
import PasswordInput from './PasswordInput.jsx'

const SignIn = () =>{

    return (

        <div class='stack'>
            <div class='container'>
                <img class='image-centered ' src={icon} alt='user icon'/>

                <div class='input-container'>
                    <p>Username</p>
                    <input class='custom-input' type='text'/>
                </div>
                <div class='input-container'>
                    <p>Password</p>
                    <PasswordInput/>
                </div>

                <div class='button-container'>
                    <Link to="/register">
                        <button class='button-left'>New user</button>
                    </Link>
                    <button class='button-right'>Sign In</button>
                </div>
            </div>
        </div>

    )

}

export default SignIn;