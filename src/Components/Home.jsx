import './Home.css';
import { Link } from "react-router-dom";
import icon from '../assets/Home/icon.svg';



const Home = () => {
    return (
        <div className='stack'>
            <h2 className='centered-text heading drop-shadow'>Premier Service Solutions</h2>
            <img className='image-size-quarter-screen-centered' src={icon} alt="Icon" />
            <Link to="/sign_in" style={{ marginTop: 20 }}>
                <button className='white-rounded-icon'>Sign In</button>
            </Link>
            <Link className='centered-text link' to="/register" >
                Register
            </Link>
        </div>
    );
}

export default Home;
