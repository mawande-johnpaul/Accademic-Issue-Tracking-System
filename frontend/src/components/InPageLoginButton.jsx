// Importing Link from react-router-dom to enable client-side navigation
import { Link } from 'react-router-dom';
// Functional component that renders a styled link as a button for login/signup
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
