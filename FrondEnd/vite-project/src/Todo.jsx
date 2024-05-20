import { useEffect, useState } from "react";
import axios from "axios";
import "./Todo.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { IoAddCircleSharp } from "react-icons/io5";
const ToDo = () => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(null);
  const [taskList, setList] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setList(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!todo.trim()) return; // Prevent adding empty tasks

    try {
      if (editingTaskId) {
        const response = await axios.put(`http://localhost:3000/users/${editingTaskId}`, { task: todo });
        setList(taskList.map((task) => (task._id === editingTaskId ? response.data : task)));
        setEditingTaskId(null);
      } else {
        const response = await axios.post("http://localhost:3000/users", { task: todo });
        setList([...taskList, response.data]);
      }
      setTodo(""); // Clear the input field
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("There was an error saving the task!");
      console.error("There was an error saving the task!", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${_id}`);
      setList((prevData) => prevData.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setTodo(task.task);
  };

  return (
    <div className="main">
      <div className="topcontainer">
        <div className="text">
        <label htmlFor="taskInput">To-Do Buddy</label>
        </div>
        <div className="listlenght">
        <h1>  {taskList.length}</h1>
        </div>
        
      
      </div>
      <div className="addtask">
        <input
          id="taskInput"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Write your task"
          type="text"
        />
        <button onClick={addTask}> <IoAddCircleSharp size={25}  /></button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="tasklist">
        {taskList.map((task, index) => (
          <div key={index} className="tasks">
            <div className="maintask">
            {task.task}
            </div>
            <div className="button">
              <button onClick={() => handleEdit(task._id)} className="editbtn">
                <FaRegEdit />
              </button>
              <button onClick={() => handleDelete(task._id)} className="deletebtn">
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ToDo };
