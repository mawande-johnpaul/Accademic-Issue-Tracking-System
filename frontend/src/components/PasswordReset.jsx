import React, { useState } from "react";

const PasswordReset = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Simulate API calls
    const sendVerificationCode = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setMessage("Verification code sent to your email.");
            setStep(2);
        }, 1000);
    };

    const verifyCode = async () => {
        setLoading(true);
        setTimeout(() => {
            if (code === "123456") { // Simulated correct code
                setMessage("");
                setStep(3);
            } else {
                setMessage("Invalid verification code.");
            }
            setLoading(false);
        }, 1000);
    };

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setMessage("Password reset successful. You may now log in.");
            setStep(4);
        }, 1000);
    };

    return (
        <div style={{ maxWidth: 400, margin: "40px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
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
                            style={{ width: "100%", marginTop: 8, marginBottom: 16 }}
                        />
                    </label>
                    <button type="submit" disabled={loading}>
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