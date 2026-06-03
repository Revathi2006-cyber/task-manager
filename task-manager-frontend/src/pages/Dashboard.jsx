import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const [editTask, setEditTask] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", taskData);
      toast.success("Task created successfully!");

      setTaskData({
        title: "",
        description: "",
      });

      getTasks();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const deleteTask = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/tasks/${id}`);
    toast.success("Task deleted successfully!");
    getTasks();
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

  const openEditModal = (task) => {
  setEditTask(task);

  setEditData({
    title: task.title,
    description: task.description,
  });
};
const saveTask = async () => {
  try {
    await API.put(`/tasks/${editTask._id}`, {
      title: editData.title,
      description: editData.description,
    });
    toast.success("Task updated successfully!");

    setEditTask(null);

    getTasks();
  } catch (error) {
    toast.error("Something went wrong!");
  }
};

  const toggleComplete = async (task) => {
  try {
    await API.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });

    toast.success(
      !task.completed
        ? "Task marked complete!"
        : "Task marked pending!"
    );

    getTasks();
  } catch (error) {
    toast.error("Something went wrong!");
  }
};
 const filteredTasks = tasks.filter((task) => {
  const matchesSearch =
    task.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesFilter =
    filter === "all"
      ? true
      : filter === "completed"
      ? task.completed
      : !task.completed;

  return matchesSearch && matchesFilter;
});
const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (task) => task.completed
).length;

const pendingTasks = tasks.filter(
  (task) => !task.completed
).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Welcome */}
        <h2 className="text-xl mb-6">
          Welcome, {user?.name} 👋
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-gray-500">
      Total Tasks
    </h3>

    <p className="text-3xl font-bold">
      {totalTasks}
    </p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-gray-500">
      Completed
    </h3>

    <p className="text-3xl font-bold text-green-600">
      {completedTasks}
    </p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-gray-500">
      Pending
    </h3>

    <p className="text-3xl font-bold text-yellow-600">
      {pendingTasks}
    </p>
  </div>
</div>

        {/* Create Task Card */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Create New Task
          </h2>

          <form onSubmit={createTask}>
            <input
              type="text"
              placeholder="Task Title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  title: e.target.value,
                })
              }
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="text"
              placeholder="Task Description"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  description: e.target.value,
                })
              }
              className="w-full border p-3 rounded mb-4"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Task Heading */}
        <h2 className="text-2xl font-bold mb-4">
          My Tasks
        </h2>
        <input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="w-full border p-3 rounded mb-4"
/>
        <div className="flex gap-2 mb-4">
        <button
        onClick={() => setFilter("all")}
         className={`px-3 py-1 rounded text-white ${
    filter === "all"
      ? "bg-blue-700"
      : "bg-blue-500"
  }`}
        >
            All
        </button>

        <button
        onClick={() => setFilter("completed")}
         className={`px-3 py-1 rounded text-white ${
    filter === "all"
      ? "bg-blue-700"
      : "bg-blue-500"
  }`}
        >
            Completed
        </button>

        <button
        onClick={() => setFilter("pending")}
         className={`px-3 py-1 rounded text-white ${
    filter === "all"
      ? "bg-blue-700"
      : "bg-blue-500"
  }`}
        >
            Pending
        </button>
</div>

        {/* Empty State */}
        {filteredTasks.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-center">
  <p className="text-4xl mb-2">
    📋
  </p>

  <p className="text-gray-500">
    No tasks found.
  </p>

  <p className="text-gray-400 text-sm mt-1">
    Create a task to get started.
  </p>
</div>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-xl shadow mb-4"
            >
              <h3 className="text-xl font-semibold">
                {task.completed ? "✅" : "⬜"}{" "}
                {task.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {task.description}
              </p>

              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() =>
                    toggleComplete(task)
                  }
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  {task.completed
                    ? "Mark Pending"
                    : "Mark Complete"}
                </button>

                <button 
                onClick={() =>
                    openEditModal(task)
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                    Edit
                </button>

                <button
                  onClick={() =>
                    deleteTask(task._id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
        {editTask && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">
        Edit Task
      </h2>

      <input
        type="text"
        value={editData.title}
        onChange={(e) =>
          setEditData({
            ...editData,
            title: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="text"
        value={editData.description}
        onChange={(e) =>
          setEditData({
            ...editData,
            description: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-4"
      />

      <div className="flex gap-2">
        <button
          onClick={saveTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>

        <button
          onClick={() =>
            setEditTask(null)
          }
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Dashboard;