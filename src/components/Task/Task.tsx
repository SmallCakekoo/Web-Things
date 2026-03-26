import { useState } from "react";
import type { Task } from "../../types/Task";

export const TaskComponent = ({ title, description, completed }: Task) => {
    const [isCompleted, setIsCompleted] = useState<boolean>(completed);

    const handleToggle = () => {
        setIsCompleted(!isCompleted);
    };

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <input type="checkbox" checked={isCompleted} onChange={handleToggle} />
      <h3>{isCompleted ? "Completed" : "Not Completed"}</h3>
    </div>
  );
};
