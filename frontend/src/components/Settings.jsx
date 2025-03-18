const Settings = ({ user }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const updatePassword = async () => {
    console.log("Updating password");
  };

  return (
    <div>
      <div className="content-section-header">Settings</div>
      <div className="content-section-body">
        <div>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={updatePassword}>Update password</button>
          <div>{error}</div>
        </div>
      </div>
    </div>
  );
}

export default Settings;