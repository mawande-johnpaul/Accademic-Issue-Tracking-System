import axios from "axios";
import React, { useState } from "react";

const PasswordReset = ({backend}) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const sendVerificationCode = async () => {
        setLoading(true);
        setMessage("");
        try {
            await axios.post(`${backend}/api/password-reset/send-code/`, { email });
            setMessage("Verification code sent to your email.");
            setStep(2);
        } catch (err) {
            setMessage("Failed to send verification code.");
        }
        setLoading(false);
    };

    const verifyCode = async () => {
        setLoading(true);
        setMessage("");
        try {
            await axios.post(`${backend}/api/password-reset/verify-code/`, { email, code });
            setStep(3);
        } catch (err) {
            setMessage("Invalid verification code.");
        }
        setLoading(false);
    };

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        setLoading(true);
        setMessage("");
        try {
            await axios.post(`${backend}/api/password-reset/reset-password/`, {
                email,
                code,
                new_password: newPassword
            });
            setMessage("Password reset successful. You may now log in.");
            setStep(4);
        } catch (err) {
            setMessage("Failed to reset password. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8, fontFamily:"Inter" }}>
            <h2>Password Reset</h2>
            {message && <div style={{ color: "blue", marginBottom: 12 }}>{message}</div>}

            {step === 1 && (
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        sendVerificationCode();
                    }}
                >
                    <label>
                        Enter your email:
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={e => setEmail(e.target.value)}
                            className="inputinputs"
                            style={{margin:"10px auto"}}
                        />
                    </label>
                    <button type="submit" disabled={loading} className="buttons" style={{margin:"0 auto"}}>
                        {loading ? "Sending..." : "Send Verification Code"}
                    </button>
                </form>
            )}

            {step === 2 && (
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        verifyCode();
                    }}
                >
                    <label>
                        Enter verification code:
                        <input
                            type="text"
                            value={code}
                            required
                            onChange={e => setCode(e.target.value)}
                            style={{ width: "100%", marginTop: 8, marginBottom: 16 }}
                        />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? "Verifying..." : "Verify Code"}
                    </button>
                </form>
            )}

            {step === 3 && (
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        resetPassword();
                    }}
                >
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={newPassword}
                            required
                            onChange={e => setNewPassword(e.target.value)}
                            style={{ width: "100%", marginTop: 8, marginBottom: 16 }}
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            required
                            onChange={e => setConfirmPassword(e.target.value)}
                            style={{ width: "100%", marginTop: 8, marginBottom: 16 }}
                        />
                    </label>
                    <button type="submit" disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            )}

            {step === 4 && (
                <div>
                    <p>Password has been reset successfully.</p>
                    <a href="/login">Go to Login</a>
                </div>
            )}
        </div>
    );
};

export default PasswordReset;