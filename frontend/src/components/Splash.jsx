import InPageLoginButton from './InPageLoginButton';

const Splash = () => {
  return (
    <div className='splash'>
      <img src="bookmark.svg" alt="logo" style={{ width: "20%" }} />
      <h1>This is how it works:</h1>
      <p>1. Sign up or log in to your account.</p>
      <p>2. Select an action from the left panel.</p>
      <p>3. Follow the instructions on the screen.</p> {/* Added step 3 */}
      <p>4. Log out when you're done to protect your data.</p>
      <p>5. Enjoy your experience!</p>
      <InPageLoginButton />
    </div>
  );
};

export default Splash;
