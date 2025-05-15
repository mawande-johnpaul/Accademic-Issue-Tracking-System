import { Link } from 'react-router-dom';

const InPageLoginButton = () => {
  return (
    <Link
      className="InPageLoginButton"
      to="/"
      role="button"
      tabIndex={0}
      title="Login or Signup"
    >
      Login/Signup
    </Link>
  );
}

export default InPageLoginButton;
