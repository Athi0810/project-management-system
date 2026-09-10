import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Projects() {
    const [projects, setProjects] = useState([]);

    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Not Started");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchProjects = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/projects", {
                params: {
                    search: search || undefined,
                    status: filterStatus || undefined
                }
            });

            setProjects(response.data.projects);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load projects"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [search, filterStatus]);

    const clearForm = () => {
        setEditingId(null);
        setProjectName("");
        setDescription("");
        setStatus("Not Started");
        setStartDate("");
        setEndDate("");
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();

        setCreating(true);
        setError("");
        setSuccess("");

        try {
            await api.post("/projects", {
                projectName,
                description,
                status,
                startDate: startDate || null,
                endDate: endDate || null
            });

            clearForm();
            setSuccess("Project created successfully");
            fetchProjects();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create project"
            );
        } finally {
            setCreating(false);
        }
    };

    const handleEdit = (project) => {
        setEditingId(project.id);
        setProjectName(project.project_name);
        setDescription(project.description || "");
        setStatus(project.status);
        setStartDate(project.start_date || "");
        setEndDate(project.end_date || "");
        setError("");
        setSuccess("");
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            await api.put(`/projects/${editingId}`, {
                projectName,
                description,
                status,
                startDate: startDate || null,
                endDate: endDate || null
            });

            clearForm();
            setSuccess("Project updated successfully");
            fetchProjects();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update project"
            );
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await api.delete(`/projects/${id}`);

            setSuccess("Project deleted successfully");
            fetchProjects();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete project"
            );
        }
    };

    return (
        <>
            <Navbar />

            <main className="page-container">
                <div className="page-header">
                    <h1>Projects</h1>
                    <p>Manage and track your projects</p>
                </div>

                {error && (
                    <div className="alert error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert success-message">
                        {success}
                    </div>
                )}

                <section className="form-card">
                    <h2>
                        {editingId
                            ? "Edit Project"
                            : "Create New Project"}
                    </h2>

                    <form
                        onSubmit={
                            editingId
                                ? handleUpdateProject
                                : handleCreateProject
                        }
                    >
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Project Name</label>
                                <input
                                    type="text"
                                    value={projectName}
                                    onChange={(e) =>
                                        setProjectName(e.target.value)
                                    }
                                    placeholder="Enter project name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                >
                                    <option value="Not Started">
                                        Not Started
                                    </option>
                                    <option value="In Progress">
                                        In Progress
                                    </option>
                                    <option value="Completed">
                                        Completed
                                    </option>
                                </select>
                            </div>

                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Enter project description"
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) =>
                                        setEndDate(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="primary-button"
                                disabled={creating}
                            >
                                {editingId
                                    ? "Update Project"
                                    : creating
                                    ? "Creating..."
                                    : "Create Project"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={clearForm}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </section>

                <section className="list-card">
                    <div className="list-header">
                        <div>
                            <h2>Project List</h2>
                            <p>Search and filter your projects</p>
                        </div>

                        <div className="filters">
                            <input
                                type="text"
                                placeholder="Search project..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                            />

                            <select
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                            >
                                <option value="">
                                    All Status
                                </option>
                                <option value="Not Started">
                                    Not Started
                                </option>
                                <option value="In Progress">
                                    In Progress
                                </option>
                                <option value="Completed">
                                    Completed
                                </option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <p className="loading">Loading projects...</p>
                    ) : projects.length === 0 ? (
                        <p className="empty-message">
                            No projects found.
                        </p>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Status</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id}>
                                            <td>
                                                <strong>
                                                    {project.project_name}
                                                </strong>

                                                <small>
                                                    {project.description ||
                                                        "No description"}
                                                </small>
                                            </td>

                                            <td>
                                                <span
                                                    className={`status-badge ${project.status
                                                        .toLowerCase()
                                                        .replace(
                                                            " ",
                                                            "-"
                                                        )}`}
                                                >
                                                    {project.status}
                                                </span>
                                            </td>

                                            <td>
                                                {project.start_date ||
                                                    "Not set"}
                                            </td>

                                            <td>
                                                {project.end_date ||
                                                    "Not set"}
                                            </td>

                                            <td>
                                                {new Date(
                                                    project.created_at
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                project
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                project.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}

export default Projects;