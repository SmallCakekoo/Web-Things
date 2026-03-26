import { useState } from "react";
import { TaskComponent } from "./Task/Task";
import type { Task } from "../types/Task";

export const Form = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      setTasks([...tasks, { title, description, completed: false }]);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskComponent
            key={index}
            title={task.title}
            description={task.description}
            completed={task.completed}
          />
        ))}
      </div>
      <button type="submit">Añadir Tarea</button>
    </form>
  );
};
