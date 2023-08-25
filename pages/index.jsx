import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  

  useEffect(() => {
    fetch("/api/todos")
    .then((response) => response.json())
    .then((response) => setTasks(response));

    fetch("/api/todos")
    .then((response) => response.json())
    .then((response) => setIncompleteTasks(response));
  }, [])

  const [newTitleTask, setNewTitleTask] = useState("");

  const handleNewTitleChange = (e) => {
    setNewTitleTask(e.target.value);
  };

  const handleSearchChange = (e) => {
    if (e.target.value === ""){
      setIncompleteTasks([...tasks]);
    }else{
      setIncompleteTasks([...tasks.filter((task) => task.title.includes(e.target.value))]);
    }
  };

  const handleAddNewTask = async () => {
    const response = await fetch("api/todos", {
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify({title: newTitleTask}),
    });

    const json = await response.json();
    setTasks([...tasks, json.task]);
    setIncompleteTasks([...incompleteTasks, json.task]);

    setNewTitleTask("");
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks([...tasks.map((t) => t.id === updatedTask.id  ? updatedTask : t)]);
    setIncompleteTasks([...incompleteTasks.map((t) => t.id === updatedTask.id ? updatedTask : t)]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks([...tasks.filter((task) => task.id !== taskId)]);
    setIncompleteTasks([...incompleteTasks.filter((task) => task.id !== taskId)]);
  };

  return (
    <div className="container">
      <p>
        <label htmlFor="new-task">Add Item</label>
        <input
          data-testid="newTaskTitle"
          id="new-task"
          type="text"
          value={newTitleTask}
          onChange={handleNewTitleChange}
        />
        <button className="addButton" onClick={handleAddNewTask}>Add</button>
      </p>
      <h3>Todo</h3>
      <p>
        <input
            data-testid="filterTaskTitle"
            id="filter-task"
            type="text"
            placeholder="search"
            onChange={handleSearchChange}
        />
      </p>
      <ul id="incomplete-tasks">
        {incompleteTasks
          .filter((task) => !task.completed)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
      <h3>Completed</h3>
      <ul id="completed-tasks">
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
      </ul>
    </div>
  );
}
