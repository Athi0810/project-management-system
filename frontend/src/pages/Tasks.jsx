import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);

    const [projectId, setProjectId] = useState("");
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("Pending");
    const [dueDate, setDueDate] = useState("");

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPriority, setFilterPriority] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects");

            setProjects(response.data.projects);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load projects"
            );
        }
    };

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/tasks", {
                params: {
                    search: search || undefined,
                    status: filterStatus || undefined,
                    priority: filterPriority || undefined
                }
            });

            setTasks(response.data.tasks);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to load tasks"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [search, filterStatus, filterPriority]);

    const clearForm = () => {
        setEditingId(null);
        setProjectId("");
        setTaskName("");
        setDescription("");
        setPriority("Medium");
        setStatus("Pending");
        setDueDate("");
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();

        setCreating(true);
        setError("");
        setSuccess("");

        try {
            await api.post("/tasks", {
                projectId: Number(projectId),
                taskName,
                description,
                priority,
                status,
                dueDate: dueDate || null
            });

            clearForm();

            setSuccess("Task created successfully");

            fetchTasks();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create task"
            );
        } finally {
            setCreating(false);
        }
    };

    const handleEdit = (task) => {
        setEditingId(task.id);
        setProjectId(task.project_id);
        setTaskName(task.task_name);
        setDescription(task.description || "");
        setPriority(task.priority);
        setStatus(task.status);
        setDueDate(task.due_date || "");

        setError("");
        setSuccess("");
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            await api.put(`/tasks/${editingId}`, {
                taskName,
                description,
                priority,
                status,
                dueDate: dueDate || null
            });

            clearForm();

            setSuccess("Task updated successfully");

            fetchTasks();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update task"
            );
        }
    };

    const handleComplete = async (task) => {
        try {
            setError("");
            setSuccess("");

            await api.put(`/tasks/${task.id}`, {
                taskName: task.task_name,
                description: task.description || "",
                priority: task.priority,
                status: "Completed",
                dueDate: task.due_date || null
            });

            setSuccess("Task marked as completed");

            fetchTasks();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to complete task"
            );
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            await api.delete(`/tasks/${id}`);

            setSuccess("Task deleted successfully");

            fetchTasks();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete task"
            );
        }
    };

    const getProjectName = (id) => {
        const project = projects.find(
            (project) => project.id === id
        );

        return project
            ? project.project_name
            : "Unknown Project";
    };

    return (
        <>
            <Navbar />

            <main className="page-container">

                <div className="page-header">
                    <h1>Tasks</h1>

                    <p>
                        Manage and track your project tasks
                    </p>
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
                            ? "Edit Task"
                            : "Create New Task"}
                    </h2>

                    <form
                        onSubmit={
                            editingId
                                ? handleUpdateTask
                                : handleCreateTask
                        }
                    >

                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Project
                                </label>

                                <select
                                    value={projectId}
                                    onChange={(e) =>
                                        setProjectId(e.target.value)
                                    }
                                    required={!editingId}
                                    disabled={editingId !== null}
                                >
                                    <option value="">
                                        Select Project
                                    </option>

                                    {projects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.project_name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Task Name
                                </label>

                                <input
                                    type="text"
                                    value={taskName}
                                    onChange={(e) =>
                                        setTaskName(e.target.value)
                                    }
                                    placeholder="Enter task name"
                                    required
                                />

                            </div>

                            <div className="form-group full-width">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Enter task description"
                                    rows="4"
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Priority
                                </label>

                                <select
                                    value={priority}
                                    onChange={(e) =>
                                        setPriority(e.target.value)
                                    }
                                >
                                    <option value="Low">
                                        Low
                                    </option>

                                    <option value="Medium">
                                        Medium
                                    </option>

                                    <option value="High">
                                        High
                                    </option>
                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                >
                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>
                                </select>

                            </div>

                            <div className="form-group">

                                <label>
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) =>
                                        setDueDate(e.target.value)
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
                                    ? "Update Task"
                                    : creating
                                    ? "Creating..."
                                    : "Create Task"}
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
                            <h2>
                                Task List
                            </h2>

                            <p>
                                Search and filter your tasks
                            </p>
                        </div>

                        <div className="filters">

                            <input
                                type="text"
                                placeholder="Search task..."
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

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="In Progress">
                                    In Progress
                                </option>

                                <option value="Completed">
                                    Completed
                                </option>
                            </select>

                            <select
                                value={filterPriority}
                                onChange={(e) =>
                                    setFilterPriority(e.target.value)
                                }
                            >
                                <option value="">
                                    All Priority
                                </option>

                                <option value="Low">
                                    Low
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="High">
                                    High
                                </option>
                            </select>

                        </div>

                    </div>

                    {loading ? (
                        <p className="loading">
                            Loading tasks...
                        </p>
                    ) : tasks.length === 0 ? (
                        <p className="empty-message">
                            No tasks found.
                        </p>
                    ) : (
                        <div className="table-container">

                            <table>

                                <thead>
                                    <tr>
                                        <th>
                                            Task
                                        </th>

                                        <th>
                                            Project
                                        </th>

                                        <th>
                                            Priority
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Due Date
                                        </th>

                                        <th>
                                            Created
                                        </th>

                                        <th>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {tasks.map((task) => (

                                        <tr key={task.id}>

                                            <td>
                                                <strong>
                                                    {task.task_name}
                                                </strong>

                                                <small>
                                                    {task.description ||
                                                        "No description"}
                                                </small>
                                            </td>

                                            <td>
                                                {getProjectName(
                                                    task.project_id
                                                )}
                                            </td>

                                            <td>

                                                <span
                                                    className={`priority-badge ${task.priority.toLowerCase()}`}
                                                >
                                                    {task.priority}
                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={`status-badge ${task.status
                                                        .toLowerCase()
                                                        .replace(
                                                            " ",
                                                            "-"
                                                        )}`}
                                                >
                                                    {task.status}
                                                </span>

                                            </td>

                                            <td>
                                                {task.due_date ||
                                                    "Not set"}
                                            </td>

                                            <td>
                                                {new Date(
                                                    task.created_at
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            handleEdit(
                                                                task
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    {task.status !==
                                                        "Completed" && (
                                                        <button
                                                            className="complete-button"
                                                            onClick={() =>
                                                                handleComplete(
                                                                    task
                                                                )
                                                            }
                                                        >
                                                            Complete
                                                        </button>
                                                    )}

                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                task.id
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

export default Tasks;
