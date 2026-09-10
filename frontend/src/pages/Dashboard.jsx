import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get("/dashboard");

                setData(response.data.dashboard);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />

                <main className="page-container">
                    <div className="dashboard-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading dashboard...</p>
                    </div>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />

                <main className="page-container">
                    <div className="alert error-message">
                        {error}
                    </div>
                </main>
            </>
        );
    }

    const cards = [
        {
            title: "Total Projects",
            value: data.totalProjects,
            description: "All your projects"
        },
        {
            title: "Total Tasks",
            value: data.totalTasks,
            description: "Tasks across projects"
        },
        {
            title: "Completed Tasks",
            value: data.completedTasks,
            description: "Successfully completed"
        },
        {
            title: "Pending Tasks",
            value: data.pendingTasks,
            description: "Tasks waiting to be done"
        },
        {
            title: "Projects In Progress",
            value: data.projectsInProgress,
            description: "Currently active projects"
        }
    ];

    return (
        <>
            <Navbar />

            <main className="page-container">

                <div className="dashboard-welcome">
                    <div>
                        <h1>Dashboard</h1>

                        <p>
                            Here's an overview of your projects and tasks.
                        </p>
                    </div>
                </div>

                <div className="dashboard-grid">

                    {cards.map((card) => (
                        <div
                            className="dashboard-card"
                            key={card.title}
                        >
                            <div className="dashboard-card-content">
                                <h3>{card.title}</h3>

                                <p className="dashboard-number">
                                    {card.value}
                                </p>

                                <span className="dashboard-description">
                                    {card.description}
                                </span>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="dashboard-info">

                    <div className="dashboard-info-card">
                        <h2>Project Management</h2>

                        <p>
                            Create projects, organize tasks, track
                            progress and manage your work efficiently
                            from one place.
                        </p>
                    </div>

                    <div className="dashboard-info-card">
                        <h2>Quick Overview</h2>

                        <p>
                            Use the Projects and Tasks sections to
                            create, update, search and filter your
                            project information.
                        </p>
                    </div>

                </div>

            </main>
        </>
    );
}

export default Dashboard;
