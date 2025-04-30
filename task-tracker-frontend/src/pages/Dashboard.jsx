import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProjectCard from "../components/ProjectCard"
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/projects", { name: projectName });
      setProjectName("");
      fetchProjects(); // Refresh list
    } catch (err) {
      alert("Failed to create project");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>

      <form onSubmit={handleCreateProject} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border p-2 flex-1"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      <ul className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
