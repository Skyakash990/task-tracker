import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
const ProjectCard = ({ project }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({title: "",description: "", status: "todo",});
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const startEditTask = (task) => {
    setEditingTaskId(task._id);
    setNewTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (!editingTaskId) return;

    try {
      await axios.put(`/tasks/${editingTaskId}`, newTask);
      setEditingTaskId(null); // Clear editing mode
      setNewTask({ title: "", description: "", status: "todo" }); // Reset input fields
      fetchTasks(); // Refresh tasks list
    } catch (err) {
      console.error("Failed to update task", err);
      alert("Failed to update task");
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`/tasks/${project._id}`);
      console.log("API raw response:", res.data);
      // console.log("Fetched tasks:", res.data.tasks);  // Log for clarity
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      fetchTasks(); // Refresh task list after deletion
    } catch (err) {
      console.error("Failed to delete task", err);
      alert("Failed to delete task");
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/tasks/${project._id}`, newTask);
      setNewTask({ title: "", description: "", status: "todo" });
      fetchTasks();
    } catch (err) {
      alert("Failed to create task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const status = (task.status || "").toLowerCase();
    return filter === "all" ? true : status === filter.toLowerCase();
  });

  return (
    <div className="border rounded p-4 bg-white shadow">
      <h2 className="font-semibold text-lg mb-2">{project.name}</h2>

      <form
        onSubmit={editingTaskId ? handleUpdateTask : handleCreateTask}
        className="space-y-2 mb-4"
      >
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="w-full border p-2"
        />
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="w-full border p-2"
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          {editingTaskId?"Update Task":"Add Task"}
        </button>
      </form>

      <div className="mb-2">
        <label className="mr-2 font-medium">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-1"
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {filteredTasks.length > 0 ? (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border-b border-gray-300 font-semibold text-sm">
                Title
              </th>
              <th className="text-left p-3 border-b border-gray-300 font-semibold text-sm">
                Status
              </th>
              <th className="text-left p-3 border-b border-gray-300 font-semibold text-sm"></th>
              <th className="text-left p-3 border-b border-gray-300 font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 border-b border-gray-200 text-sm">
                  {task.title}
                </td>
                <td className="p-3 border-b border-gray-200 text-sm capitalize">
                  {task.status}
                </td>
                <td className="border-b border-gray-200 text-sm capitalize text-center text-lime-50 ">
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                  >
                    X
                  </button>
                </td>
                <td className="border-b border-gray-200 text-sm capitalize text-center text-lime-50">
                  <button
                    onClick={() => startEditTask(task)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  {editingTaskId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTaskId(null);
                        setNewTask({
                          title: "",
                          description: "",
                          status: "todo",
                        });
                      }}
                      className="ml-2 text-sm text-gray-500 underline"
                    >
                      Cancel Edit
                    </button>
                  )}{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-sm">No tasks found.</p>
      )}
    </div>
  );
};
export default ProjectCard;
