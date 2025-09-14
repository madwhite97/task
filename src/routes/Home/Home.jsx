import { useEffect, useState } from "react";
import { BiCircle } from "react-icons/bi";
import { BiChevronDownCircle } from "react-icons/bi";
import { BiSolidTrash } from "react-icons/bi";

const App = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [taskInput, setTaskInput] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (taskInput.trim()) {
            const newTask = {
                id: Date.now(),
                text: taskInput,
                done: false,
            };
            setTasks([...tasks, newTask]);
            setTaskInput("");
        }
    };

    const deleteTask = (taskId) => {
        if (window.confirm("Are you sure?")) {
            setTasks(tasks.filter((task) => task.id !== taskId));
        }
    };

    const clearAllTasks = () => {
        if (window.confirm("Clear all tasks?")) {
            setTasks([]);
        }
    };

    const toggleDone = (taskId) => {
        setTasks(
            tasks.map((task) => task.id === taskId ? { ...task, done: !task.done } : task
            )
        );
    };

    return (
        <div className="container">
            <div className="task-header">
                <h1>Task Manager</h1>
                <span>Stay organized, achieve more!</span>
            </div>

            <form className="task-form" onSubmit={addTask}>
                <input type="text" id="task-input" placeholder="Write your task..." onChange={(e) => setTaskInput(e.target.value)} value={taskInput}/>
                <button type="submit">Add</button>
            </form>

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span className={task.done ? "done" : ""}>{task.text}</span>

                        <div className="task-btns">
                            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                                <BiSolidTask />
                            </button>
                            <button className="done-btn" onClick={() => toggleDone(task.id)}>
                                {task.done ? <BiChevronDownCircle /> : <BiCircle/>}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {tasks.length > 0 && (
                <div className="clear-all-container" onClick={clearAllTasks}>
                    <button id="clear-all">Clear All Taks</button>
                </div>
            )}
        </div>
    );
};

export default App;