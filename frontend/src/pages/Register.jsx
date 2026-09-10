
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.post("/auth/register", {
                fullName,
                email,
                password
            });

            navigate("/login");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <div className="auth-logo">PM</div>

                    <h1>Project Manager</h1>

                    <p>
                        Organize your projects and tasks in one place
                    </p>
                </div>

                <div className="auth-content">
                    <h2>Create account</h2>

                    <p className="auth-subtitle">
                        Get started with your project management workspace
                    </p>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>

                        <div className="auth-form-group">
                            <label>Full Name</label>

                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(e.target.value)
                                }
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div className="auth-form-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="auth-form-group">
                            <label>Password</label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Minimum 6 characters"
                                minLength="6"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating account..."
                                : "Create Account"}
                        </button>

                    </form>

                    <div className="auth-footer">
                        <span>Already have an account?</span>

                        <Link to="/login">
                            Sign in
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;

