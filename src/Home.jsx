import './home.css';
import icon from './assets/Home/icon.svg';
import icon_signin from './assets/Home/signin.svg';

export default function Home() {
    return (
        <div class='stack'>
            <h2 class='centered-text heading drop-shadow'>Premier Service Solutions</h2>
            <img class='image-size-quarter-screen-centered' src={icon} alt="Icon" />
            <button class='white-rounded-icon'>Sign In</button>
            <a class='centered-text link'>Register</a>
        </div>
    );
}
