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
            2. Select an action from the left panel.
        </p>
        <p>
            4. Log out when you're done to protect your data.
        </p>
        <p>
            5. Enjoy your experience!
        </p>
        
        {localStorage.getItem("user") ? (
        <></>
            ) : (
            <><InPageLoginButton /></>
            )}
    </div>
    

    
    </>
  );
};

export default Splash;