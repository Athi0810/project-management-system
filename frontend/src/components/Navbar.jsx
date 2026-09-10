import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/dashboard" className="navbar-logo">
                    Project Manager
                </Link>

                <div className="navbar-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/tasks">Tasks</Link>
                </div>

                <div className="navbar-user">
                    {user && (
                        <span>
                            Welcome, {user.fullName}
                        </span>
                    )}

                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;