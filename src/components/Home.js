import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';

const Home = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks().then(data => setTasks(data));
    }, []);

    return (
        <div>
            <h2>Todo List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
