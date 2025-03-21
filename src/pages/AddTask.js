import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddTask.css"; // Import the new CSS file for styling

const AddTask = () => {
    const [task, setTask] = useState({ title: "", description: "", completed: false });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/addTask", task);
        navigate("/");
    };

    return (
        <div className="add-task-container">
            <h2 className="title">➕ Add Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Enter Task Title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Enter Task Description"
                    value={task.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">✅ Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
