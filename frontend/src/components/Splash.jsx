import InPageLoginButton from "./InPageLoginButton";

const Splash = () => {
  return (
    <>
    <div style={{paddingBottom: "10px"}}>
        <img src="bookmark.svg" alt="logo" style={{width: "25%"}} />
        <h1>
            This is how it works:
        </h1>
        <p>
            1. Sign up or log in to your account.
        </p>
        <p>
            2. Click create a new issue or view your posted issues.
        </p>
        <p>
            3. Edit your profile settings.
        </p>
        <p>
            4. Log out when you're done to protect your data.
        </p>
        <p>
            5. Enjoy your experience!
        </p>
        
    </div>
    <InPageLoginButton />
    </>
  );
};

export default Splash;