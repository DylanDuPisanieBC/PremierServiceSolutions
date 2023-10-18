import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './PasswordInput.css';

const PasswordInput = ({ onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="password-input-container">
      <input className="custom-input" type={showPassword ? 'text' : 'password'} value={value} onChange={onChange}
      />
      <div className="password-icon" onClick={handleTogglePassword}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{height: '1.5vw'}} />
      </div>
    </div>
  );
};

export default PasswordInput;

