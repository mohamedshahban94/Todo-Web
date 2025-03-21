import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TaskList.css"; // Ensure CSS file exists
import { useNavigate } from "react-router-dom";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const navigate = useNavigate();

    // Fetch tasks from backend
    useEffect(() => {
        axios.get("http://localhost:8080/api/home") // Backend API URL
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error fetching tasks:", error));
    }, []);

    // Enable edit mode on double-click
    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    // Handle input change
    const handleTitleChange = (e) => setEditTitle(e.target.value);
    const handleDescriptionChange = (e) => setEditDescription(e.target.value);

    // Save edited task
    const handleSave = async (id) => {
        const updatedTask = { title: editTitle, description: editDescription };

        try {
            const response = await axios.post(`http://localhost:8080/api/editTask/${id}`, updatedTask);
            if (response.status === 200) {
                setTasks(tasks.map(task => (task.id === id ? response.data : task)));
                setEditingTaskId(null); // Exit edit mode
            } else {
                alert("Error updating task");
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Function to delete a task
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:8080/api/dropTask/${id}`);
            if (response.status === 200) {
                setTasks(tasks.filter(task => task.id !== id));
            } else {
                alert("Failed to delete task!");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };


    // Function to toggle task completion status
    const toggleStatus = async (id, currentStatus) => {
        const updatedTask = { completed: !currentStatus };
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));

        try {
            const response = await axios.post(`http://localhost:8080/api/updateStatus/${id}`, updatedTask);
            if (response.status === 200) {
                setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !currentStatus } : task)));
            } else {
                alert("Error updating status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            setTasks(tasks.map(task => 
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
        }
    };

    return (
        <div className="task-container">
            {/* Add Task Button (Styled same as Task Cards) */}
            <div className="task-card add-task-card" onClick={() => navigate("/add-task")}>
                <div className="add-task-text">+ Add Task</div>
            </div>

            {/* Existing Tasks */}
            {tasks.map(task => (
                <div key={task.id} className="task-card">
                    <div className="task-header">
                        {editingTaskId === task.id ? (
                            <div className="edit-task">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={handleTitleChange}
                                    className="edit-input"
                                    autoFocus
                                    onKeyDown={(e) => e.key === "Enter" && handleSave(task.id)}
                                />
                                <textarea
                                    value={editDescription}
                                    onChange={handleDescriptionChange}
                                    className="edit-input"
                                />
                                <button onClick={() => handleSave(task.id)} className="save-btn">Save</button>
                            </div>
                        ) : (
                            <div onDoubleClick={() => handleEditClick(task)}>
                                <div className="task-title">{task.title}</div>
                                <div className="task-description">{task.description}</div>
                                <button
                                    className={`task-status-btn ${task.completed ? "completed" : "pending"}`}
                                    onClick={() => toggleStatus(task.id, task.completed)}
                                >
                                    {task.completed ? "✔ Completed" : "⏳ Pending"}
                                </button>
                            </div>
                        )}
                        <button className="delete-btn" onClick={() => handleDelete(task.id)}>X</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
