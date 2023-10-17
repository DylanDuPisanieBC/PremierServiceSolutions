import './Home.css';
import { Link } from "react-router-dom";
import icon from '../assets/Home/icon.svg';



const Home = () => {
    return (
        <div class='stack'>
            <h2 class='centered-text heading drop-shadow'>Premier Service Solutions</h2>
            <img class='image-size-quarter-screen-centered' src={icon} alt="Icon" />
            <Link to="/sign_in" style={{ marginTop: 20 }}>
                <button className='white-rounded-icon'>Sign In</button>
            </Link>
            <Link to="/register" style={{ marginTop: 10, textDecoration: 'none', color: 'inherit' }}>
                <a className='centered-text link'>Register</a>
            </Link>
        </div>
    );
}

export default Home;
